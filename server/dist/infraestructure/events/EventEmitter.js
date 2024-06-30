"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
class EventEmitter {
    constructor() {
        this.handlers = {};
    }
    on(eventName, handler) {
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = [];
        }
        this.handlers[eventName].push(handler);
    }
    emit(eventName, event) {
        const eventHandlers = this.handlers[eventName];
        if (eventHandlers) {
            eventHandlers.forEach(handler => handler(event));
        }
    }
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map