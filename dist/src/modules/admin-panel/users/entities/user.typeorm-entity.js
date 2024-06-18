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
exports.UserTypeormEntity = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../rental-context/domains/user/domain/types");
const typeorm_1 = require("typeorm");
const tableName = 'users';
let UserTypeormEntity = class UserTypeormEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, phone: { required: true, type: () => String }, email: { required: true, type: () => String }, firstName: { required: true, type: () => String }, isEmailVerified: { required: true, type: () => Boolean }, lastName: { required: true, type: () => String }, middleName: { required: false, type: () => String }, birthDate: { required: true, type: () => String }, avatarKey: { required: false, type: () => String }, gender: { required: false, enum: require("../../../../rental-context/domains/user/domain/types").GenderType }, guarantors: { required: true, type: () => [Object] }, emailNotification: { required: true, type: () => Object }, pushNotification: { required: true, type: () => Object }, smsNotification: { required: true, type: () => Object }, identityStatus: { required: true, enum: require("../../../../rental-context/domains/user/domain/types").IdentityStatusType }, identityDocuments: { required: false, type: () => [String] }, identityRejectReason: { required: false, type: () => String }, identityUpdatedAt: { required: true, type: () => Date }, isPhoneApproved: { required: true, type: () => Boolean }, numberFines: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date } };
    }
};
UserTypeormEntity.tableName = tableName;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserTypeormEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    __metadata("design:type", String)
], UserTypeormEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    __metadata("design:type", String)
], UserTypeormEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], UserTypeormEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], UserTypeormEntity.prototype, "isEmailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], UserTypeormEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], UserTypeormEntity.prototype, "middleName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], UserTypeormEntity.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], UserTypeormEntity.prototype, "avatarKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.GenderType, nullable: true }),
    __metadata("design:type", String)
], UserTypeormEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Array)
], UserTypeormEntity.prototype, "guarantors", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], UserTypeormEntity.prototype, "emailNotification", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], UserTypeormEntity.prototype, "pushNotification", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], UserTypeormEntity.prototype, "smsNotification", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.IdentityStatusType }),
    __metadata("design:type", String)
], UserTypeormEntity.prototype, "identityStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', array: true, nullable: true }),
    __metadata("design:type", Array)
], UserTypeormEntity.prototype, "identityDocuments", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], UserTypeormEntity.prototype, "identityRejectReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UserTypeormEntity.prototype, "identityUpdatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], UserTypeormEntity.prototype, "isPhoneApproved", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], UserTypeormEntity.prototype, "numberFines", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UserTypeormEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], UserTypeormEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], UserTypeormEntity.prototype, "deletedAt", void 0);
UserTypeormEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: tableName,
    })
], UserTypeormEntity);
exports.UserTypeormEntity = UserTypeormEntity;
//# sourceMappingURL=user.typeorm-entity.js.map