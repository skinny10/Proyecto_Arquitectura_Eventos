"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupEventRoomRoutes = setupEventRoomRoutes;
const express_1 = __importDefault(require("express"));
function setupEventRoomRoutes(eventRoomController) {
    const router = express_1.default.Router();
    router.post('/event-room', eventRoomController.saveEventRoom.bind(eventRoomController));
    return router;
}
//# sourceMappingURL=eventRoomRoutes.js.map