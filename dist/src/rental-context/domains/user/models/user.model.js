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
var UserMeModel_1, UserModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserMeModel = exports.BaseUserModel = void 0;
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const model_base_1 = require("../../../../libs/ddd/interface-adapters/base-classes/model.base");
const file_key_helper_1 = require("../../../../libs/utils/file-key.helper");
const get_cf_signed_url_1 = require("../../../../libs/utils/get-cf-signed-url");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../domain/types");
const guarantor_model_1 = require("./sub-models/guarantor.model");
const user_email_notification_model_1 = require("./sub-models/user-email-notification.model");
const user_push_notification_model_1 = require("./sub-models/user-push-notification.model");
const user_sms_notification_model_1 = require("./sub-models/user-sms-notification.model");
let BaseUserModel = class BaseUserModel extends model_base_1.ModelBase {
    constructor(user) {
        super(user);
        const assignObject = {
            firstName: user.firstName,
            middleName: user.middleName || undefined,
            lastName: user.lastName,
            avatarKey: (user === null || user === void 0 ? void 0 : user.avatarKey) ? (0, file_key_helper_1.prependDomainUrlToFileKey)(user === null || user === void 0 ? void 0 : user.avatarKey) : undefined,
            birthDate: user.birthDate ? user.birthDate : undefined,
            gender: user.gender,
            isPhoneApproved: user.isPhoneApproved,
            isIdentityApproved: user.identityStatus === types_1.IdentityStatusType.APPROVED,
            isEmailVerified: user.isEmailVerified,
        };
        Object.assign(this, assignObject);
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BaseUserModel.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], BaseUserModel.prototype, "middleName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BaseUserModel.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], BaseUserModel.prototype, "avatarKey", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], BaseUserModel.prototype, "birthDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.GenderType, { nullable: true }),
    __metadata("design:type", String)
], BaseUserModel.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], BaseUserModel.prototype, "isIdentityApproved", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], BaseUserModel.prototype, "isPhoneApproved", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], BaseUserModel.prototype, "isEmailVerified", void 0);
BaseUserModel = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity])
], BaseUserModel);
exports.BaseUserModel = BaseUserModel;
let UserMeModel = UserMeModel_1 = class UserMeModel extends BaseUserModel {
    constructor(user) {
        super(user);
    }
    static create(user) {
        var _a;
        const payload = new UserMeModel_1(user);
        const assignObject = {
            phone: user.phone ? user.phone : undefined,
            email: user.email,
            identityStatus: user.identityStatus,
            identityDocuments: (_a = user.identityDocuments) === null || _a === void 0 ? void 0 : _a.map((i) => (0, get_cf_signed_url_1.getCfSignedUrl)((0, file_key_helper_1.prependDomainUrlToFileKey)(i, 'private'))),
            identityRejectReason: user.identityRejectReason,
            guarantors: user.guarantors ? user.guarantors.map(guarantor_model_1.GuarantorModel.create) : undefined,
            emailNotification: user_email_notification_model_1.UserEmailNotificationModel.create(user.emailNotification),
            pushNotification: user_push_notification_model_1.UserPushNotificationModel.create(user.pushNotification),
            smsNotification: user_sms_notification_model_1.UserSmsNotificationModel.create(user.smsNotification),
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserMeModel.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UserMeModel.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.IdentityStatusType),
    __metadata("design:type", String)
], UserMeModel.prototype, "identityStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], UserMeModel.prototype, "identityDocuments", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserMeModel.prototype, "identityRejectReason", void 0);
__decorate([
    (0, graphql_1.Field)(() => [guarantor_model_1.GuarantorModel], { nullable: true }),
    __metadata("design:type", Array)
], UserMeModel.prototype, "guarantors", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_email_notification_model_1.UserEmailNotificationModel),
    __metadata("design:type", user_email_notification_model_1.UserEmailNotificationModel)
], UserMeModel.prototype, "emailNotification", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_push_notification_model_1.UserPushNotificationModel),
    __metadata("design:type", user_push_notification_model_1.UserPushNotificationModel)
], UserMeModel.prototype, "pushNotification", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_sms_notification_model_1.UserSmsNotificationModel),
    __metadata("design:type", user_sms_notification_model_1.UserSmsNotificationModel)
], UserMeModel.prototype, "smsNotification", void 0);
UserMeModel = UserMeModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity])
], UserMeModel);
exports.UserMeModel = UserMeModel;
let UserModel = UserModel_1 = class UserModel extends BaseUserModel {
    constructor(user) {
        super(user);
    }
    static create(user) {
        const payload = new UserModel_1(user);
        return payload;
    }
};
UserModel = UserModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity])
], UserModel);
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map