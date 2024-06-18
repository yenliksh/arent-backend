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
exports.ContractSubscriptionResolver = void 0;
const pub_sub_service_1 = require("../../../../modules/graphql-subscriptions/pub-sub.service");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../bulls/types");
const contract_subscription_response_dto_1 = require("../dtos/contract.subscription.response.dto");
const innopay_page_url_subscription_response_dto_1 = require("../dtos/innopay-page-url.subscription.response.dto");
let ContractSubscriptionResolver = class ContractSubscriptionResolver {
    constructor(pubSubService) {
        this.pubSubService = pubSubService;
    }
    updateContract() {
        return this.pubSubService.asyncIterator(pub_sub_service_1.PubSubTrigger.UPDATE_CONTRACT);
    }
    innopayPageUrl() {
        return this.pubSubService.asyncIterator(pub_sub_service_1.PubSubTrigger.INNOPAY_PAGE_URL);
    }
};
__decorate([
    (0, graphql_1.Subscription)(() => contract_subscription_response_dto_1.ContractSubscriptionResponse, {
        name: pub_sub_service_1.PubSubTrigger.UPDATE_CONTRACT,
        filter: (payload, _, context) => [payload.contract.landlordId, payload.contract.tenantId].includes(context.user.id),
        resolve: async (payload, _, context) => {
            const i18nService = context.i18nService;
            const error = payload.error && Object.values(types_1.ContractExceptions).includes(payload.error)
                ? i18nService.t('contract-exceptions.' + payload.error)
                : payload.error;
            return contract_subscription_response_dto_1.ContractSubscriptionResponse.create(payload.contract, payload.event, error);
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContractSubscriptionResolver.prototype, "updateContract", null);
__decorate([
    (0, graphql_1.Subscription)(() => innopay_page_url_subscription_response_dto_1.InnopayPageUrlSubscriptionResponse, {
        name: pub_sub_service_1.PubSubTrigger.INNOPAY_PAGE_URL,
        filter: (payload, _, context) => payload.payingId === context.user.id,
        resolve: (payload) => innopay_page_url_subscription_response_dto_1.InnopayPageUrlSubscriptionResponse.create(payload.url, payload.startUrlDate.toISOString(), {
            contractId: payload.contractId,
        }),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContractSubscriptionResolver.prototype, "innopayPageUrl", null);
ContractSubscriptionResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [pub_sub_service_1.PubSubService])
], ContractSubscriptionResolver);
exports.ContractSubscriptionResolver = ContractSubscriptionResolver;
//# sourceMappingURL=contract.subscription.resolver.js.map