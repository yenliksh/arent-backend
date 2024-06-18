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
exports.WebhookReminderController = void 0;
const openapi = require("@nestjs/swagger");
const basic_auth_guard_1 = require("../../../infrastructure/guards/basic-auth.guard");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const reminder_need_to_pay_rent_service_1 = require("../services/reminder-need-to-pay-rent/reminder-need-to-pay-rent.service");
let WebhookReminderController = class WebhookReminderController {
    constructor(reminderNeedToPayRentService, configService) {
        this.reminderNeedToPayRentService = reminderNeedToPayRentService;
        this.configService = configService;
        this.isDevelopment = this.configService.get('nodeEnv') === 'development';
    }
    async needToPayRent() {
        if (this.isDevelopment) {
            return false;
        }
        await this.reminderNeedToPayRentService.handle();
        return true;
    }
};
__decorate([
    (0, common_1.Get)('need-to-pay-rent'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WebhookReminderController.prototype, "needToPayRent", null);
WebhookReminderController = __decorate([
    (0, swagger_1.ApiTags)('Webhook. Reminder'),
    (0, common_1.Controller)('v1/reminder'),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [reminder_need_to_pay_rent_service_1.ReminderNeedToPayRentService,
        config_1.ConfigService])
], WebhookReminderController);
exports.WebhookReminderController = WebhookReminderController;
//# sourceMappingURL=webhook-reminder.controller.js.map