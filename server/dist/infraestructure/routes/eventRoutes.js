"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupEventRoutes = setupEventRoutes;
const express_1 = __importDefault(require("express"));
function setupEventRoutes(eventController) {
    const router = express_1.default.Router();
    router.post('/events', eventController.saveEvent.bind(eventController));
    return router;
}
//# sourceMappingURL=eventRoutes.js.map