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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
const User_1 = require("../../domain/entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
class InMemoryUserRepository {
    constructor() {
        this.users = [];
        this.initializeUsers();
    }
    initializeUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addUser('leon', 'leon12345');
            yield this.addUser('gaby', 'gabi12345');
        });
    }
    addUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = new User_1.User(Date.now().toString(), username, hashedPassword);
            this.users.push(newUser);
            return newUser;
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find(user => user.username === username) || null;
        });
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
//# sourceMappingURL=InMemoryUserRepository.js.map