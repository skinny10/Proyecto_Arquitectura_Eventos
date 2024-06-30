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
exports.MongoEventRoom2Repository = void 0;
class MongoEventRoom2Repository {
    constructor(db) {
        this.collection = db.collection('events');
    }
    save(EventRoom2) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.collection.insertOne(EventRoom2);
            return Object.assign(Object.assign({}, EventRoom2), { id: result.insertedId.toString() });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection.find().toArray();
        });
    }
}
exports.MongoEventRoom2Repository = MongoEventRoom2Repository;
//# sourceMappingURL=MongoEventRoom2Repository.js.map