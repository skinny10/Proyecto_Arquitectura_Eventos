import { EventRoom2Repository } from "../../domain/repositories/EventRoom2Repository";
import { EventRoom2 } from "../../domain/entities/EventRoom2";
import { MongoClient, Db, Collection } from 'mongodb';


export class MongoEventRoom2Repository implements EventRoom2Repository {
    private collection: Collection<EventRoom2>;
  
    constructor(db: Db) {
      this.collection = db.collection<EventRoom2>('events');
    }
  
    async save(EventRoom2: EventRoom2): Promise<EventRoom2> {
      const result = await this.collection.insertOne(EventRoom2);
      return { ...EventRoom2, id: result.insertedId.toString() };
    }
  
    async findAll(): Promise<EventRoom2[]> {
      return this.collection.find().toArray();
    }
  }