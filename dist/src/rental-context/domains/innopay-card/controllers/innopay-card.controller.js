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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayCardController = void 0;
const openapi = require("@nestjs/swagger");
const slash_agnostic_1 = require("../../../../libs/utils/slash-agnostic");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const save_card_end_service_1 = require("../commands/save-card-end/save-card-end.service");
let InnopayCardController = class InnopayCardController {
    constructor(saveCardEndService, configService) {
        this.saveCardEndService = saveCardEndService;
        this.configService = configService;
    }
    async refreshToken({ cardId, userId, customerReference }) {
        const frontendUrl = this.configService.get('frontEnd.url');
        if (!cardId || !userId || !customerReference) {
            return { url: (0, slash_agnostic_1.slashAgnostic)(frontendUrl, 'add-payment-method-result/?status=failure') };
        }
        const result = await this.saveCardEndService.handle({ cnpCardId: cardId, cnpUserId: userId, customerReference });
        if (result.isErr()) {
            return { url: (0, slash_agnostic_1.slashAgnostic)(frontendUrl, 'add-payment-method-result/?status=failure') };
        }
        return { url: (0, slash_agnostic_1.slashAgnostic)(frontendUrl, 'add-payment-method-result/?status=success') };
    }
};
__decorate([
    (0, common_1.Redirect)(''),
    (0, common_1.Get)('save-card-end'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InnopayCardController.prototype, "refreshToken", null);
InnopayCardController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Webhook. InnopayCard'),
    (0, common_1.Controller)('v1/innopay-card'),
    __metadata("design:paramtypes", [save_card_end_service_1.SaveCardEndService, config_1.ConfigService])
], InnopayCardController);
exports.InnopayCardController = InnopayCardController;
//# sourceMappingURL=innopay-card.controller.js.map