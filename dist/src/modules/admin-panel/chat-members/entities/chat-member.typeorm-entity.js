"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMemberTypeormEntity = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../rental-context/domains/chat/domain/types");
const typeorm_1 = require("typeorm");
const tableName = 'chat_members';
let ChatMemberTypeormEntity = class ChatMemberTypeormEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, chatId: { required: true, type: () => String }, memberId: { required: true, type: () => String }, role: { required: true, enum: require("../../../../rental-context/domains/chat/domain/types").UserChatRole }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ChatMemberTypeormEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ChatMemberTypeormEntity.prototype, "chatId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], ChatMemberTypeormEntity.prototype, "memberId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.UserChatRole }),
    __metadata("design:type", String)
], ChatMemberTypeormEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ChatMemberTypeormEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ChatMemberTypeormEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], ChatMemberTypeormEntity.prototype, "deletedAt", void 0);
ChatMemberTypeormEntity = __decorate([
    (0, typeorm_1.Entity)({ name: tableName })
], ChatMemberTypeormEntity);
exports.ChatMemberTypeormEntity = ChatMemberTypeormEntity;
//# sourceMappingURL=chat-member.typeorm-entity.js.map