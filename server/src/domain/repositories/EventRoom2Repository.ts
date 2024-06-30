import { EventRoom2 } from "../entities/EventRoom2";

export interface EventRoom2Repository {
    save(event: EventRoom2): Promise<EventRoom2>;
    findAll(): Promise<EventRoom2[]>;
}

