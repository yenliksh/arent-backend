"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayTransactionBullsModule = void 0;
const rental_context_domain_repositories_module_1 = require("../../../domain-repositories/rental-context-domain-repositories.module");
const innopay_payment_factory_1 = require("../../../../infrastructure/configs/innopay-payment.factory");
const aws_module_1 = require("../../../../modules/aws/aws.module");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const innopay_payment_module_1 = require("../../../../third-parties/innopay-payment/src/innopay-payment.module");
const cancel_innopay_transaction_processor_1 = require("./handlers/cancel-innopay-transaction.processor");
const complete_cash_out_processor_1 = require("./handlers/complete-cash-out.processor");
const handle_customer_reference_processor_1 = require("./handlers/handle-customer-reference.processor");
const innopay_transaction_bulls_queue_1 = require("./innopay-transaction-bulls.queue");
const cancel_innopay_transaction_producer_1 = require("./sqs-producers/cancel-innopay-transaction.producer");
const check_access_innopay_guid_producer_1 = require("./sqs-producers/check-access-innopay-guid.producer");
const complete_cash_out_innopay_transaction_producer_1 = require("./sqs-producers/complete-cash-out-innopay-transaction.producer");
const stucked_innopay_guid_status_producer_1 = require("./sqs-producers/stucked-innopay-guid-status.producer");
const types_1 = require("./types");
const producers = [
    check_access_innopay_guid_producer_1.CheckAccessInnopayGuidProducer,
    stucked_innopay_guid_status_producer_1.StuckedInnopayGuidStatusProducer,
    cancel_innopay_transaction_producer_1.CancelInnopayTransactionProducer,
    complete_cash_out_innopay_transaction_producer_1.CompleteCashOutInnopayTransactionProducer,
];
const queues = [innopay_transaction_bulls_queue_1.InnopayTransactionBullsQueue];
const processors = [handle_customer_reference_processor_1.HandleCustomerReferenceProcessor, cancel_innopay_transaction_processor_1.CancelInnopayTransactionProcessor, complete_cash_out_processor_1.CompleteCashOutProcessor];
let InnopayTransactionBullsModule = class InnopayTransactionBullsModule {
};
InnopayTransactionBullsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({ name: types_1.InnopayBulls.INNOPAY_TRANSACTION }),
            aws_module_1.AwsModule,
            rental_context_domain_repositories_module_1.RentalContextDomainRepositoriesModule,
            innopay_payment_module_1.InnopayPaymentModule.forRootAsync(innopay_payment_factory_1.innopayPaymentFactory),
            cqrs_1.CqrsModule,
        ],
        providers: [...producers, ...queues, ...processors],
        exports: [...producers, ...queues],
    })
], InnopayTransactionBullsModule);
exports.InnopayTransactionBullsModule = InnopayTransactionBullsModule;
//# sourceMappingURL=innopay-transaction-bulls.module.js.map