import express from 'express';
import { EventRoomController } from '../controllers/EventRoomController';

export function setupEventRoomRoutes(eventRoomController: EventRoomController) {
    const router = express.Router();
    router.post('/event-room', eventRoomController.saveEventRoom.bind(eventRoomController));
    return router;
  }