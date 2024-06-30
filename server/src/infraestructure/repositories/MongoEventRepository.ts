import { EventRepository } from '../../domain/repositories/EventRepository';
import { Event } from '../../domain/entities/Event';
import { MongoClient, Db, Collection } from 'mongodb';

export class MongoEventRepository implements EventRepository {
  private collection: Collection<Event>;

  constructor(db: Db) {
    this.collection = db.collection<Event>('events');
  }

  async save(event: Event): Promise<Event> {
    const result = await this.collection.insertOne(event);
    return { ...event, id: result.insertedId.toString() };
  }

  async findAll(): Promise<Event[]> {
    return this.collection.find().toArray();
  }
}