import { EventRoomRepository } from "../../domain/repositories/EventRoomRepository";
import { EventRoom } from "../../domain/entities/EventRoom";
import { MongoClient, Db, Collection } from 'mongodb';


export class MongoEventRoomRepository implements EventRoomRepository {
    private collection: Collection<EventRoom>;
  
    constructor(db: Db) {
      this.collection = db.collection<EventRoom>('events');
    }
  
    async save(EventRoom: EventRoom): Promise<EventRoom> {
      const result = await this.collection.insertOne(EventRoom);
      return { ...EventRoom, id: result.insertedId.toString() };
    }
  
    async findAll(): Promise<EventRoom[]> {
      return this.collection.find().toArray();
    }
  }