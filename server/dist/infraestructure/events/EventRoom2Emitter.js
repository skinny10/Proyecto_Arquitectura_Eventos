"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoom2Emitter = void 0;
class EventRoom2Emitter {
    constructor() {
        this.handlers = {};
    }
    on(eventRoom2Name, handler) {
        if (!this.handlers[eventRoom2Name]) {
            this.handlers[eventRoom2Name] = [];
        }
        this.handlers[eventRoom2Name].push(handler);
    }
    emit(eventRoom2Name, event) {
        const eventRoom2Handlers = this.handlers[eventRoom2Name];
        if (eventRoom2Handlers) {
            eventRoom2Handlers.forEach(handler => handler(event));
        }
    }
}
exports.EventRoom2Emitter = EventRoom2Emitter;
//# sourceMappingURL=EventRoom2Emitter.js.map