import express from 'express';
import dotenv from 'dotenv';
import { InMemoryUserRepository } from './infraestructure/repositories/InMemoryUserRepository';
import { AuthService } from './application/services/AuthService';
import { AuthController } from './infraestructure/controllers/AuthController';
//
import { EventEmitter } from './infraestructure/events/EventEmitter';
import { MongoEventRepository } from './infraestructure/repositories/MongoEventRepository';
import { SaveEventUseCase } from './application/useCases/SaveEventUseCase';
import { EventController } from './infraestructure/controllers/EventController';
import { setupEventRoutes } from './infraestructure/routes/eventRoutes'
//
import { EventRoomEmitter } from './infraestructure/events/EventRoomEmitter';
import { MongoEventRoomRepository } from './infraestructure/repositories/MongoEventRoomRepository';
import { SaveEventRoomUseCase } from './application/useCases/SaveEventRoomUseCase';
import { EventRoomController } from './infraestructure/controllers/EventRoomController';
import { setupEventRoomRoutes } from './infraestructure/routes/eventRoomRoutes';
//
import { EventRoom2Emitter } from './infraestructure/events/EventRoom2Emitter';
import { MongoEventRoom2Repository } from './infraestructure/repositories/MongoEventRoom2Repository';
import { SaveEventRoom2UseCase } from './application/useCases/SaveEventRoom2UseCase';
import { EventRoom2Controller } from './infraestructure/controllers/EventRoom2Controller';
import { setupEventRoom2Routes } from './infraestructure/routes/eventRoom2Routes';
//
import cors from 'cors';
import { MongoClient } from 'mongodb';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

const eventEmitter = new EventEmitter();
const eventRoomEmitter = new EventRoomEmitter();
const eventRoom2Emitter = new EventRoom2Emitter();
//
const userRepository = new InMemoryUserRepository();
const authService = new AuthService(userRepository, eventEmitter);
const authController = new AuthController(authService, eventEmitter);
//

app.post('/login', (req, res) => authController.login(req, res));

// Configuración de MongoDB y repositorio de eventos
const mongoClient = new MongoClient(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017');
mongoClient.connect().then(() => {
  console.log('Connected to MongoDB');
  const db = mongoClient.db('architecture_events');
  const eventRepository = new MongoEventRepository(db);
  const saveEventUseCase = new SaveEventUseCase(eventRepository);
  const eventController = new EventController(saveEventUseCase);
  //
  const eventRoomRepository = new MongoEventRoomRepository(db);
  const saveEventRoomUseCase = new SaveEventRoomUseCase(eventRoomRepository);
  const eventRoomController = new EventRoomController(saveEventRoomUseCase);
//
const eventRoom2Repository = new MongoEventRoom2Repository(db);
const saveEventRoom2UseCase = new SaveEventRoom2UseCase(eventRoom2Repository);
const eventRoom2Controller = new EventRoom2Controller(saveEventRoom2UseCase);
//
  // Configurar rutas de eventos
  app.use('/api', setupEventRoutes(eventController));
  app.use('/api', setupEventRoomRoutes(eventRoomController));
  app.use('/api', setupEventRoom2Routes(eventRoom2Controller));
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

app.options('*', cors());

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Manejo de cierre del servidor
process.on('SIGINT', () => {
  mongoClient.close().then(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});