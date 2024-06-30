type EventRoomHandler<T> = (event: T) => void;

export class EventRoomEmitter {
  private handlers: { [eventRoomName: string]: EventRoomHandler<any>[] } = {};

  on<T>(eventRoomName: string, handler: EventRoomHandler<T>) {
    if (!this.handlers[eventRoomName]) {
      this.handlers[eventRoomName] = [];
    }
    this.handlers[eventRoomName].push(handler);
  }

  emit<T>(eventRoomName: string, event: T) {
    const evenRoomtHandlers = this.handlers[eventRoomName];
    if (evenRoomtHandlers) {
        evenRoomtHandlers.forEach(handler => handler(event));
    }
  }
}