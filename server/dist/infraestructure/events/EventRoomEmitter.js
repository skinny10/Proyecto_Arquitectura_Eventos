"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoomEmitter = void 0;
class EventRoomEmitter {
    constructor() {
        this.handlers = {};
    }
    on(eventRoomName, handler) {
        if (!this.handlers[eventRoomName]) {
            this.handlers[eventRoomName] = [];
        }
        this.handlers[eventRoomName].push(handler);
    }
    emit(eventRoomName, event) {
        const evenRoomtHandlers = this.handlers[eventRoomName];
        if (evenRoomtHandlers) {
            evenRoomtHandlers.forEach(handler => handler(event));
        }
    }
}
exports.EventRoomEmitter = EventRoomEmitter;
//# sourceMappingURL=EventRoomEmitter.js.map