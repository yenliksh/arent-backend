"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayCardModule = void 0;
const rental_context_domain_repositories_module_1 = require("../../domain-repositories/rental-context-domain-repositories.module");
const innopay_payment_factory_1 = require("../../../infrastructure/configs/innopay-payment.factory");
const common_1 = require("@nestjs/common");
const innopay_payment_module_1 = require("../../../third-parties/innopay-payment/src/innopay-payment.module");
const add_charge_off_card_handler_1 = require("./commands/add-charge-off-card/add-charge-off-card.handler");
const delete_card_service_1 = require("./commands/delete-card/delete-card.service");
const save_card_end_service_1 = require("./commands/save-card-end/save-card-end.service");
const save_card_start_service_1 = require("./commands/save-card-start/save-card-start.service");
const innopay_card_controller_1 = require("./controllers/innopay-card.controller");
const find_my_card_service_1 = require("./queries/find-my-card/find-my-card.service");
const find_my_cards_service_1 = require("./queries/find-my-cards/find-my-cards.service");
const tenant_contract_card_service_1 = require("./queries/tenant-contract-card/tenant-contract-card.service");
const innopay_card_mutation_resolver_1 = require("./resolvers/innopay-card.mutation.resolver");
const innopay_card_query_resolver_1 = require("./resolvers/innopay-card.query.resolver");
const graphqlResolvers = [innopay_card_mutation_resolver_1.InnopayCardMutationGraphqlResolver, innopay_card_query_resolver_1.InnopayCardQueryGraphqlResolver];
const commands = [save_card_start_service_1.SaveCardStartService, save_card_end_service_1.SaveCardEndService, delete_card_service_1.DeleteCardService, add_charge_off_card_handler_1.AddChargeOffCardHandler];
const queries = [find_my_cards_service_1.FindMyCardsService, find_my_card_service_1.FindMyCardService, tenant_contract_card_service_1.TenantContractCardService];
let InnopayCardModule = class InnopayCardModule {
};
InnopayCardModule = __decorate([
    (0, common_1.Module)({
        imports: [innopay_payment_module_1.InnopayPaymentModule.forRootAsync(innopay_payment_factory_1.innopayPaymentFactory), rental_context_domain_repositories_module_1.RentalContextDomainRepositoriesModule],
        providers: [...graphqlResolvers, ...commands, ...queries],
        exports: [find_my_card_service_1.FindMyCardService],
        controllers: [innopay_card_controller_1.InnopayCardController],
    })
], InnopayCardModule);
exports.InnopayCardModule = InnopayCardModule;
//# sourceMappingURL=innopay-card.module.js.map