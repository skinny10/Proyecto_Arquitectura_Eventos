import { EventRoom2 } from "../../domain/entities/EventRoom2";
import { EventRoom2Repository } from "../../domain/repositories/EventRoom2Repository";

export class SaveEventRoom2UseCase {
    constructor(private EventRoom2Repository: EventRoom2Repository) {}

    async execute(EventRoom2: Omit<EventRoom2, 'id'>): Promise<EventRoom2> {
        return this.EventRoom2Repository.save(EventRoom2);
    }
}