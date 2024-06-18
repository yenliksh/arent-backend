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
var UserPushNotificationModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPushNotificationModel = void 0;
const graphql_1 = require("@nestjs/graphql");
let UserPushNotificationModel = UserPushNotificationModel_1 = class UserPushNotificationModel {
    static create(userEmailNotification) {
        const payload = new UserPushNotificationModel_1();
        Object.assign(payload, userEmailNotification);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "reminderUnreadMessages", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "newMessages", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "bookingRequestSent", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "bookingRequestUpdated", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "contractOfferSent", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "contractOfferUpdated", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "contractCompleted", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "contractConcluded", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "contractRejectedByAdmin", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "bookingRequestAccepted", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "changesInPassportDetails", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "reminderTenantUpcomingEntryDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "reminderLandlordUpcomingEntryDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "recurringPaymentSuccess", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "recurringPaymentFailure", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "adApproved", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "adRejected", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "adStatusUpdatedByAdmin", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "adRemovedByAdmin", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserPushNotificationModel.prototype, "adUpdatedByAdmin", void 0);
UserPushNotificationModel = UserPushNotificationModel_1 = __decorate([
    (0, graphql_1.ObjectType)()
], UserPushNotificationModel);
exports.UserPushNotificationModel = UserPushNotificationModel;
//# sourceMappingURL=user-push-notification.model.js.map