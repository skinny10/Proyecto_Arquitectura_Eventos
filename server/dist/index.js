"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const InMemoryUserRepository_1 = require("./infraestructure/repositories/InMemoryUserRepository");
const AuthService_1 = require("./application/services/AuthService");
const AuthController_1 = require("./infraestructure/controllers/AuthController");
const EventEmitter_1 = require("./infraestructure/events/EventEmitter");
const MongoEventRepository_1 = require("./infraestructure/repositories/MongoEventRepository");
const SaveEventUseCase_1 = require("./application/useCases/SaveEventUseCase");
const EventController_1 = require("./infraestructure/controllers/EventController");
const eventRoutes_1 = require("./infraestructure/routes/eventRoutes");
const EventRoomEmitter_1 = require("./infraestructure/events/EventRoomEmitter");
const MongoEventRoomRepository_1 = require("./infraestructure/repositories/MongoEventRoomRepository");
const SaveEventRoomUseCase_1 = require("./application/useCases/SaveEventRoomUseCase");
const EventRoomController_1 = require("./infraestructure/controllers/EventRoomController");
const eventRoomRoutes_1 = require("./infraestructure/routes/eventRoomRoutes");
const EventRoom2Emitter_1 = require("./infraestructure/events/EventRoom2Emitter");
const MongoEventRoom2Repository_1 = require("./infraestructure/repositories/MongoEventRoom2Repository");
const SaveEventRoom2UseCase_1 = require("./application/useCases/SaveEventRoom2UseCase");
const EventRoom2Controller_1 = require("./infraestructure/controllers/EventRoom2Controller");
const eventRoom2Routes_1 = require("./infraestructure/routes/eventRoom2Routes");
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
const eventEmitter = new EventEmitter_1.EventEmitter();
const eventRoomEmitter = new EventRoomEmitter_1.EventRoomEmitter();
const eventRoom2Emitter = new EventRoom2Emitter_1.EventRoom2Emitter();
const userRepository = new InMemoryUserRepository_1.InMemoryUserRepository();
const authService = new AuthService_1.AuthService(userRepository, eventEmitter);
const authController = new AuthController_1.AuthController(authService, eventEmitter);
app.post('/login', (req, res) => authController.login(req, res));
const mongoClient = new mongodb_1.MongoClient(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017');
mongoClient.connect().then(() => {
    console.log('Connected to MongoDB');
    const db = mongoClient.db('architecture_events');
    const eventRepository = new MongoEventRepository_1.MongoEventRepository(db);
    const saveEventUseCase = new SaveEventUseCase_1.SaveEventUseCase(eventRepository);
    const eventController = new EventController_1.EventController(saveEventUseCase);
    const eventRoomRepository = new MongoEventRoomRepository_1.MongoEventRoomRepository(db);
    const saveEventRoomUseCase = new SaveEventRoomUseCase_1.SaveEventRoomUseCase(eventRoomRepository);
    const eventRoomController = new EventRoomController_1.EventRoomController(saveEventRoomUseCase);
    const eventRoom2Repository = new MongoEventRoom2Repository_1.MongoEventRoom2Repository(db);
    const saveEventRoom2UseCase = new SaveEventRoom2UseCase_1.SaveEventRoom2UseCase(eventRoom2Repository);
    const eventRoom2Controller = new EventRoom2Controller_1.EventRoom2Controller(saveEventRoom2UseCase);
    app.use('/api', (0, eventRoutes_1.setupEventRoutes)(eventController));
    app.use('/api', (0, eventRoomRoutes_1.setupEventRoomRoutes)(eventRoomController));
    app.use('/api', (0, eventRoom2Routes_1.setupEventRoom2Routes)(eventRoom2Controller));
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});
app.options('*', (0, cors_1.default)());
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
process.on('SIGINT', () => {
    mongoClient.close().then(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
});
//# sourceMappingURL=index.js.map