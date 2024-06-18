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
exports.MessageTypeormEntity = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../rental-context/domains/message/domain/types");
const typeorm_1 = require("typeorm");
const tableName = 'messages';
let MessageTypeormEntity = class MessageTypeormEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, chatId: { required: true, type: () => String }, senderId: { required: true, type: () => String }, type: { required: true, enum: require("../../../../rental-context/domains/message/domain/types").MessageType }, status: { required: true, enum: require("../../../../rental-context/domains/message/domain/types").MessageStatus }, text: { required: false, type: () => String, nullable: true }, fileKey: { required: false, type: () => String, nullable: true }, fileName: { required: false, type: () => String, nullable: true }, fileWeight: { required: false, type: () => Number, nullable: true }, systemMessageType: { required: false, nullable: true }, contractData: { required: false, type: () => Object, nullable: true }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date } };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MessageTypeormEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], MessageTypeormEntity.prototype, "chatId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], MessageTypeormEntity.prototype, "senderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.MessageType }),
    __metadata("design:type", String)
], MessageTypeormEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.MessageStatus }),
    __metadata("design:type", String)
], MessageTypeormEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], MessageTypeormEntity.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], MessageTypeormEntity.prototype, "fileKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], MessageTypeormEntity.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], MessageTypeormEntity.prototype, "fileWeight", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.SystemMessageType, nullable: true }),
    __metadata("design:type", Object)
], MessageTypeormEntity.prototype, "systemMessageType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], MessageTypeormEntity.prototype, "contractData", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], MessageTypeormEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], MessageTypeormEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], MessageTypeormEntity.prototype, "deletedAt", void 0);
MessageTypeormEntity = __decorate([
    (0, typeorm_1.Entity)({ name: tableName })
], MessageTypeormEntity);
exports.MessageTypeormEntity = MessageTypeormEntity;
//# sourceMappingURL=message.typeorm-entity.js.map