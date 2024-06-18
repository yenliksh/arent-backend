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
exports.WebhookRecurrentPaymentController = void 0;
const openapi = require("@nestjs/swagger");
const basic_auth_guard_1 = require("../../../../../infrastructure/guards/basic-auth.guard");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const Sentry = require("@sentry/node");
const tenant_recurrent_pay_command_1 = require("../commands/tenant-recurrent-pay/tenant-recurrent-pay.command");
const transfer_money_to_receiver_command_1 = require("../commands/transfer-money-to-receiver/transfer-money-to-receiver.command");
let WebhookRecurrentPaymentController = class WebhookRecurrentPaymentController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async transferMoneyToLandlord() {
        Sentry.captureException('trigger transfer-money test');
        await this.commandBus.execute(new transfer_money_to_receiver_command_1.TransferMoneyToReceiverCommand());
        return true;
    }
    async withdrawalMoneyFromTenant() {
        Sentry.captureException('trigger withdrawal-money test');
        await this.commandBus.execute(new tenant_recurrent_pay_command_1.TenantRecurrentPayCommand());
        return true;
    }
};
__decorate([
    (0, common_1.Get)('transfer-money'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WebhookRecurrentPaymentController.prototype, "transferMoneyToLandlord", null);
__decorate([
    (0, common_1.Get)('withdrawal-money'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WebhookRecurrentPaymentController.prototype, "withdrawalMoneyFromTenant", null);
WebhookRecurrentPaymentController = __decorate([
    (0, swagger_1.ApiTags)('Webhook. Payment'),
    (0, common_1.Controller)('v1/payment'),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], WebhookRecurrentPaymentController);
exports.WebhookRecurrentPaymentController = WebhookRecurrentPaymentController;
//# sourceMappingURL=webhook-recurrent-payment.controller.js.map