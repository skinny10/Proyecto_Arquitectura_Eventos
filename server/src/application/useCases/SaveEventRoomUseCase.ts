import { EventRoom } from "../../domain/entities/EventRoom";
import { EventRoomRepository } from "../../domain/repositories/EventRoomRepository";

export class SaveEventRoomUseCase {
    constructor(private EventRoomRepository: EventRoomRepository) {}

    async execute(EventRoom: Omit<EventRoom, 'id'>): Promise<EventRoom> {
        return this.EventRoomRepository.save(EventRoom);
    }
}