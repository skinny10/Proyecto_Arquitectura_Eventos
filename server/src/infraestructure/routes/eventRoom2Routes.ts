import express from 'express';
import { EventRoom2Controller } from '../controllers/EventRoom2Controller';

export function setupEventRoom2Routes(eventRoom2Controller: EventRoom2Controller) {
    const router = express.Router();
    router.post('/event-room2', eventRoom2Controller.saveEventRoom2.bind(eventRoom2Controller));
    return router;
  }