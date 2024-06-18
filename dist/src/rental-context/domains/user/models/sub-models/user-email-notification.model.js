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
var UserEmailNotificationModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmailNotificationModel = void 0;
const graphql_1 = require("@nestjs/graphql");
let UserEmailNotificationModel = UserEmailNotificationModel_1 = class UserEmailNotificationModel {
    static create(userEmailNotification) {
        const payload = new UserEmailNotificationModel_1();
        Object.assign(payload, userEmailNotification);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserEmailNotificationModel.prototype, "newMessages", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserEmailNotificationModel.prototype, "bookingRequest", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserEmailNotificationModel.prototype, "contractConcluded", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserEmailNotificationModel.prototype, "businessTrains", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserEmailNotificationModel.prototype, "recurringPaymentSuccess", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserEmailNotificationModel.prototype, "recurringPaymentFailure", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserEmailNotificationModel.prototype, "reminderNeedToPayRent", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserEmailNotificationModel.prototype, "adApproved", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserEmailNotificationModel.prototype, "adRejected", void 0);
UserEmailNotificationModel = UserEmailNotificationModel_1 = __decorate([
    (0, graphql_1.ObjectType)()
], UserEmailNotificationModel);
exports.UserEmailNotificationModel = UserEmailNotificationModel;
//# sourceMappingURL=user-email-notification.model.js.map