"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupEventRoom2Routes = setupEventRoom2Routes;
const express_1 = __importDefault(require("express"));
function setupEventRoom2Routes(eventRoom2Controller) {
    const router = express_1.default.Router();
    router.post('/event-room2', eventRoom2Controller.saveEventRoom2.bind(eventRoom2Controller));
    return router;
}
//# sourceMappingURL=eventRoom2Routes.js.map