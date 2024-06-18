"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastMessageLoader = void 0;
const chat_orm_entity_1 = require("../../../../infrastructure/database/entities/chat.orm-entity");
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
let LastMessageLoader = class LastMessageLoader {
    generateDataLoader() {
        return new DataLoader(async (chatIds) => {
            const chats = await chat_orm_entity_1.ChatOrmEntity.query()
                .withGraphFetched({ lastMessage: true }, { joinOperation: 'leftJoin' })
                .findByIds(chatIds);
            return chatIds.map((id) => { var _a; return (_a = chats.find((chat) => chat.id === id)) === null || _a === void 0 ? void 0 : _a.lastMessage; });
        });
    }
};
LastMessageLoader = __decorate([
    (0, common_1.Injectable)()
], LastMessageLoader);
exports.LastMessageLoader = LastMessageLoader;
//# sourceMappingURL=last-message.dataloader.js.map