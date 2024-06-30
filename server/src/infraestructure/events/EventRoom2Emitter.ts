type EventRoom2Handler<T> = (event: T) => void;

export class EventRoom2Emitter {
  private handlers: { [eventRoomName: string]: EventRoom2Handler<any>[] } = {};

  on<T>(eventRoom2Name: string, handler: EventRoom2Handler<T>) {
    if (!this.handlers[eventRoom2Name]) {
      this.handlers[eventRoom2Name] = [];
    }
    this.handlers[eventRoom2Name].push(handler);
  }

  emit<T>(eventRoom2Name: string, event: T) {
    const eventRoom2Handlers = this.handlers[eventRoom2Name];
    if (eventRoom2Handlers) {
        eventRoom2Handlers.forEach(handler => handler(event));
    }
  }
}