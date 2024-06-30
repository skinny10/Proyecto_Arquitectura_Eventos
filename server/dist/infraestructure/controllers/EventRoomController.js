"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoomController = void 0;
class EventRoomController {
    constructor(SaveEventRoomUseCase) {
        this.SaveEventRoomUseCase = SaveEventRoomUseCase;
    }
    saveEventRoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield this.SaveEventRoomUseCase.execute({
                    type: req.body.type,
                    details: req.body.details,
                    timestamp: new Date()
                });
                res.status(201).json(event);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al guardar el evento de Room' });
            }
        });
    }
}
exports.EventRoomController = EventRoomController;
//# sourceMappingURL=EventRoomController.js.map