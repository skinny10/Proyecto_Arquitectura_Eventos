import express from 'express';
import { EventController } from '../controllers/EventController';

export function setupEventRoutes(eventController: EventController) {
  const router = express.Router();
  router.post('/events', eventController.saveEvent.bind(eventController));
  return router;
}