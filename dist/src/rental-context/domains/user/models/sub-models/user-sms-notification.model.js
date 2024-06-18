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
var UserSmsNotificationModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSmsNotificationModel = void 0;
const graphql_1 = require("@nestjs/graphql");
let UserSmsNotificationModel = UserSmsNotificationModel_1 = class UserSmsNotificationModel {
    static create(userEmailNotification) {
        const payload = new UserSmsNotificationModel_1();
        Object.assign(payload, userEmailNotification);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserSmsNotificationModel.prototype, "reminderUnreadMessages", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserSmsNotificationModel.prototype, "accountRemovedByAdmin", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserSmsNotificationModel.prototype, "bookingRequestUpdated", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserSmsNotificationModel.prototype, "contractCancellationOfTheLease", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserSmsNotificationModel.prototype, "reminderUpcomingDepartureDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], UserSmsNotificationModel.prototype, "reminderNeedToPayRent", void 0);
UserSmsNotificationModel = UserSmsNotificationModel_1 = __decorate([
    (0, graphql_1.ObjectType)()
], UserSmsNotificationModel);
exports.UserSmsNotificationModel = UserSmsNotificationModel;
//# sourceMappingURL=user-sms-notification.model.js.map