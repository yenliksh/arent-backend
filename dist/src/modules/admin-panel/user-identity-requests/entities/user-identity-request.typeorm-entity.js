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
exports.UserIdentityRequestTypeormEntity = void 0;
const openapi = require("@nestjs/swagger");
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const types_1 = require("../../../../rental-context/domains/user/domain/types");
const typeorm_1 = require("typeorm");
const tableName = 'user_identity_requests';
let UserIdentityRequestTypeormEntity = class UserIdentityRequestTypeormEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, firstName: { required: true, type: () => String }, isEmailVerified: { required: true, type: () => Boolean }, lastName: { required: true, type: () => String }, middleName: { required: false, type: () => String }, email: { required: true, type: () => String }, birthDate: { required: true, type: () => String }, guarantors: { required: false, type: () => [Object] }, emailNotification: { required: true, type: () => Object }, smsNotification: { required: true, type: () => Object }, pushNotification: { required: true, type: () => Object }, avatarKey: { required: false, type: () => String }, gender: { required: false, enum: require("../../../../rental-context/domains/user/domain/types").GenderType }, identityStatus: { required: true, enum: require("../../../../rental-context/domains/user/domain/types").IdentityStatusType }, identityDocuments: { required: false, type: () => [String] }, identityRejectReason: { required: false, type: () => String }, identityUpdatedAt: { required: true, type: () => Date }, phone: { required: true, type: () => String }, numberFines: { required: true, type: () => Number }, isPhoneApproved: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: false, type: () => Date } };
    }
};
UserIdentityRequestTypeormEntity.tableName = tableName;
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], UserIdentityRequestTypeormEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], UserIdentityRequestTypeormEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], UserIdentityRequestTypeormEntity.prototype, "isEmailVerified", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], UserIdentityRequestTypeormEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], UserIdentityRequestTypeormEntity.prototype, "middleName", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], UserIdentityRequestTypeormEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], UserIdentityRequestTypeormEntity.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Array)
], UserIdentityRequestTypeormEntity.prototype, "guarantors", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], UserIdentityRequestTypeormEntity.prototype, "emailNotification", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], UserIdentityRequestTypeormEntity.prototype, "smsNotification", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], UserIdentityRequestTypeormEntity.prototype, "pushNotification", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], UserIdentityRequestTypeormEntity.prototype, "avatarKey", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], UserIdentityRequestTypeormEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], UserIdentityRequestTypeormEntity.prototype, "identityStatus", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Array)
], UserIdentityRequestTypeormEntity.prototype, "identityDocuments", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], UserIdentityRequestTypeormEntity.prototype, "identityRejectReason", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], UserIdentityRequestTypeormEntity.prototype, "identityUpdatedAt", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], UserIdentityRequestTypeormEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Number)
], UserIdentityRequestTypeormEntity.prototype, "numberFines", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], UserIdentityRequestTypeormEntity.prototype, "isPhoneApproved", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], UserIdentityRequestTypeormEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], UserIdentityRequestTypeormEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], UserIdentityRequestTypeormEntity.prototype, "deletedAt", void 0);
UserIdentityRequestTypeormEntity = __decorate([
    (0, typeorm_1.ViewEntity)({
        name: tableName,
        expression: (connection) => connection
            .createQueryBuilder()
            .select('users.id', 'id')
            .addSelect('users.firstName', 'firstName')
            .addSelect('users.lastName', 'lastName')
            .addSelect('users.middleName', 'middleName')
            .addSelect('users.email', 'email')
            .addSelect('users.birthDate', 'birthDate')
            .addSelect('users.isEmailVerified', 'isEmailVerified')
            .addSelect('users.avatarKey', 'avatarKey')
            .addSelect('users.gender', 'gender')
            .addSelect('users.identityStatus', 'identityStatus')
            .addSelect('users.identityDocuments', 'identityDocuments')
            .addSelect('users.identityRejectReason', 'identityRejectReason')
            .addSelect('users.identityUpdatedAt', 'identityUpdatedAt')
            .addSelect('users.phone', 'phone')
            .addSelect('users.isPhoneApproved', 'isPhoneApproved')
            .addSelect('users.numberFines', 'numberFines')
            .addSelect('users.guarantors', 'guarantors')
            .addSelect('users.emailNotification', 'emailNotification')
            .addSelect('users.smsNotification', 'smsNotification')
            .addSelect('users.pushNotification', 'pushNotification')
            .addSelect('users.createdAt', 'createdAt')
            .addSelect('users.updatedAt', 'updatedAt')
            .addSelect('users.deletedAt', 'deletedAt')
            .from(user_orm_entity_1.UserOrmEntity.tableName, 'users')
            .where(`"users"."identityStatus" = '${types_1.IdentityStatusType.PROCESSING}'`)
            .andWhere(`"users"."identityDocuments" IS NOT NULL`)
            .orderBy('users.identityUpdatedAt', 'DESC'),
    })
], UserIdentityRequestTypeormEntity);
exports.UserIdentityRequestTypeormEntity = UserIdentityRequestTypeormEntity;
//# sourceMappingURL=user-identity-request.typeorm-entity.js.map