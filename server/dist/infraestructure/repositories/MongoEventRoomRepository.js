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
exports.MongoEventRoomRepository = void 0;
class MongoEventRoomRepository {
    constructor(db) {
        this.collection = db.collection('events');
    }
    save(EventRoom) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.collection.insertOne(EventRoom);
            return Object.assign(Object.assign({}, EventRoom), { id: result.insertedId.toString() });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection.find().toArray();
        });
    }
}
exports.MongoEventRoomRepository = MongoEventRoomRepository;
//# sourceMappingURL=MongoEventRoomRepository.js.map