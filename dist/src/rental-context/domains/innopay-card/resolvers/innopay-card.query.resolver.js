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
exports.InnopayCardQueryGraphqlResolver = void 0;
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const guards_1 = require("../../../../infrastructure/guards");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const innopay_card_model_1 = require("../models/innopay-card.model");
const find_my_cards_request_1 = require("../queries/find-my-cards/find-my-cards.request");
const find_my_cards_service_1 = require("../queries/find-my-cards/find-my-cards.service");
const tenant_contract_card_request_1 = require("../queries/tenant-contract-card/tenant-contract-card.request");
const tenant_contract_card_service_1 = require("../queries/tenant-contract-card/tenant-contract-card.service");
let InnopayCardQueryGraphqlResolver = class InnopayCardQueryGraphqlResolver {
    constructor(findMyCardsService, tenantContractCardService) {
        this.findMyCardsService = findMyCardsService;
        this.tenantContractCardService = tenantContractCardService;
    }
    async getMyCards(iam, input) {
        const result = await this.findMyCardsService.handle(iam.id, input);
        if (result.isErr()) {
            throw result.unwrapErr();
        }
        return result.unwrap().map((card) => innopay_card_model_1.InnopayCardModel.create(card));
    }
    async tenantContractCard(userId, input) {
        const result = await this.tenantContractCardService.handle(input, userId);
        return innopay_card_model_1.InnopayCardModel.create(result);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => [innopay_card_model_1.InnopayCardModel], { name: 'innopay__my_cards' }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity,
        find_my_cards_request_1.FindMyCardsRequest]),
    __metadata("design:returntype", Promise)
], InnopayCardQueryGraphqlResolver.prototype, "getMyCards", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Query)(() => innopay_card_model_1.InnopayCardModel, { name: 'innopay__tenant_contractCard' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tenant_contract_card_request_1.TenantContractCardRequest]),
    __metadata("design:returntype", Promise)
], InnopayCardQueryGraphqlResolver.prototype, "tenantContractCard", null);
InnopayCardQueryGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [find_my_cards_service_1.FindMyCardsService,
        tenant_contract_card_service_1.TenantContractCardService])
], InnopayCardQueryGraphqlResolver);
exports.InnopayCardQueryGraphqlResolver = InnopayCardQueryGraphqlResolver;
//# sourceMappingURL=innopay-card.query.resolver.js.map