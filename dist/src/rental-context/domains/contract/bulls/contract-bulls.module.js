"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractBullsModule = void 0;
const rental_context_domain_repositories_module_1 = require("../../../domain-repositories/rental-context-domain-repositories.module");
const innopay_transaction_bulls_module_1 = require("../../innopay-transaction/bulls/innopay-transaction-bulls.module");
const innopay_payment_factory_1 = require("../../../../infrastructure/configs/innopay-payment.factory");
const elasticsearch_core_module_1 = require("../../../../infrastructure/elastic-search/elasticsearch-core.module");
const graphql_subscriptions_module_1 = require("../../../../modules/graphql-subscriptions/graphql-subscriptions.module");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const innopay_payment_module_1 = require("../../../../third-parties/innopay-payment/src/innopay-payment.module");
const accept_contract_offer_processor_1 = require("./processors/accept-contract-offer.processor");
const instant_booking_processor_1 = require("./processors/instant-booking.processor");
const instant_temporary_booking_processor_1 = require("./processors/instant-temporary-booking.processor");
const reject_contract_offer_processor_1 = require("./processors/reject-contract-offer.processor");
const send_contract_offer_processor_1 = require("./processors/send-contract-offer.processor");
const temporapy_contract_conclude_processor_1 = require("./processors/temporapy-contract-conclude.processor");
const contract_offer_queue_1 = require("./queue/contract-offer.queue");
const contract_offer_pub_sub_service_1 = require("./services/contract-offer-pub-sub.service");
const types_1 = require("./types");
const queues = [contract_offer_queue_1.ContractOfferQueue];
const processors = [
    accept_contract_offer_processor_1.AcceptContractOfferProcessor,
    reject_contract_offer_processor_1.RejectContractOfferProcessor,
    send_contract_offer_processor_1.SendContractOfferProcessor,
    instant_booking_processor_1.InstantBookingProcessor,
    temporapy_contract_conclude_processor_1.ContractTemporaryConcludeProcessor,
    instant_temporary_booking_processor_1.InstantTemporaryBookingProcessor,
];
const services = [contract_offer_pub_sub_service_1.ContractOfferPubSubService];
let ContractBullsModule = class ContractBullsModule {
};
ContractBullsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({ name: types_1.ContractBulls.CONTRACT_OFFER_QUEUE }),
            innopay_payment_module_1.InnopayPaymentModule.forRootAsync(innopay_payment_factory_1.innopayPaymentFactory),
            rental_context_domain_repositories_module_1.RentalContextDomainRepositoriesModule,
            elasticsearch_core_module_1.ElasticsearchCoreModule,
            graphql_subscriptions_module_1.GraphqlSubscriptionsModule,
            cqrs_1.CqrsModule,
            innopay_transaction_bulls_module_1.InnopayTransactionBullsModule,
        ],
        providers: [...queues, ...processors, ...services],
        exports: queues,
    })
], ContractBullsModule);
exports.ContractBullsModule = ContractBullsModule;
//# sourceMappingURL=contract-bulls.module.js.map