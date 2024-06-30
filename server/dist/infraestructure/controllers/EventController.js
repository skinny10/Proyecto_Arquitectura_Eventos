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
exports.EventController = void 0;
class EventController {
    constructor(saveEventUseCase) {
        this.saveEventUseCase = saveEventUseCase;
    }
    saveEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield this.saveEventUseCase.execute({
                    type: req.body.type,
                    details: req.body.details,
                    timestamp: new Date()
                });
                res.status(201).json(event);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al guardar el evento' });
            }
        });
    }
}
exports.EventController = EventController;
//# sourceMappingURL=EventController.js.map