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
exports.ContractCronController = void 0;
const openapi = require("@nestjs/swagger");
const basic_auth_guard_1 = require("../../../../../infrastructure/guards/basic-auth.guard");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const Sentry = require("@sentry/node");
const complete_past_contracts_command_1 = require("../commands/complete-past-contracts/complete-past-contracts.command");
let ContractCronController = class ContractCronController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async completePastContract() {
        Sentry.captureException('trigger complete past contracts');
        await this.commandBus.execute(new complete_past_contracts_command_1.CompletePastContractsCommand());
        return true;
    }
};
__decorate([
    (0, common_1.Get)('complete-past-contracts'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContractCronController.prototype, "completePastContract", null);
ContractCronController = __decorate([
    (0, swagger_1.ApiTags)('Webhook. Contract'),
    (0, common_1.Controller)('v1/contract'),
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], ContractCronController);
exports.ContractCronController = ContractCronController;
//# sourceMappingURL=contract-cron.controller.js.map