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
exports.AuthController = void 0;
class AuthController {
    constructor(authService, eventEmitter) {
        this.authService = authService;
        this.eventEmitter = eventEmitter;
        this.loginAttempts = {};
        this.eventEmitter.on('loginAttempt', this.handleLoginAttempt.bind(this));
    }
    handleLoginAttempt(event) {
        if (!event.success) {
            this.loginAttempts[event.username] = (this.loginAttempts[event.username] || 0) + 1;
        }
        else {
            delete this.loginAttempts[event.username];
        }
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(400).json({ error: 'Username and password are required' });
                return;
            }
            const attempts = this.loginAttempts[username] || 0;
            try {
                const token = yield this.authService.login(username, password);
                if (!token) {
                    this.loginAttempts[username] = attempts + 1;
                    if (this.loginAttempts[username] >= 3) {
                        res.status(403).json({ error: 'No estás autorizado a entrar a la casa', attemptsLeft: 0 });
                    }
                    else {
                        res.status(401).json({ error: 'Invalid credentials', attemptsLeft: 3 - this.loginAttempts[username] });
                    }
                    return;
                }
                delete this.loginAttempts[username];
                res.json({ token });
            }
            catch (error) {
                console.error('Login error:', error);
                res.status(500).json({ error: 'An error occurred during login' });
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map