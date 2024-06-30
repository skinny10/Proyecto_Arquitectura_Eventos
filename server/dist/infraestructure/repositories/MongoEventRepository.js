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
exports.MongoEventRepository = void 0;
class MongoEventRepository {
    constructor(db) {
        this.collection = db.collection('events');
    }
    save(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.collection.insertOne(event);
            return Object.assign(Object.assign({}, event), { id: result.insertedId.toString() });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection.find().toArray();
        });
    }
}
exports.MongoEventRepository = MongoEventRepository;
//# sourceMappingURL=MongoEventRepository.js.map