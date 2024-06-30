import { Request, Response } from 'express';
import { SaveEventRoomUseCase } from '../../application/useCases/SaveEventRoomUseCase';

export class EventRoomController {
    constructor(private SaveEventRoomUseCase: SaveEventRoomUseCase) {}
  
    async saveEventRoom(req: Request, res: Response) {
      try {
        const event = await this.SaveEventRoomUseCase.execute({
          type: req.body.type,
          details: req.body.details,
          timestamp: new Date()
        });
        res.status(201).json(event);
      } catch (error) {
        res.status(500).json({ error: 'Error al guardar el evento de Room' });
      }
    }
  }