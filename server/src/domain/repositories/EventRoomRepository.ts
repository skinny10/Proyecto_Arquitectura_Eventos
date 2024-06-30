import { EventRoom } from "../entities/EventRoom";

export interface EventRoomRepository {
    save(event: EventRoom): Promise<EventRoom>;
    findAll(): Promise<EventRoom[]>;
}

