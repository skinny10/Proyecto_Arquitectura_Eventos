import { Request, Response } from 'express';
import { SaveEventRoom2UseCase } from '../../application/useCases/SaveEventRoom2UseCase';

export class EventRoom2Controller {
    constructor(private SaveEventRoom2UseCase: SaveEventRoom2UseCase) {}
  
    async saveEventRoom2(req: Request, res: Response) {
      try {
        const event = await this.SaveEventRoom2UseCase.execute({
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