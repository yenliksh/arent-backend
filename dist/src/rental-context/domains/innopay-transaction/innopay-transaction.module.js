"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayTransactionModule = void 0;
const rental_context_domain_repositories_module_1 = require("../../domain-repositories/rental-context-domain-repositories.module");
const innopay_payment_factory_1 = require("../../../infrastructure/configs/innopay-payment.factory");
const import_ssut_sqs_module_1 = require("../../../libs/utils/import-ssut-sqs-module");
const constants_1 = require("../../../modules/aws/sqs/constants");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const innopay_payment_module_1 = require("../../../third-parties/innopay-payment/src/innopay-payment.module");
const innopay_transaction_bulls_module_1 = require("./bulls/innopay-transaction-bulls.module");
const reverse_innopay_transaction_handler_1 = require("./commands/reverse-innopay-transaction/reverse-innopay-transaction.handler");
const innopay_transaction_webhook_controller_1 = require("./webhooks/rest-api/innopay-transaction.webhook.controller");
const innopay_transaction_webhook_service_1 = require("./webhooks/rest-api/innopay-transaction.webhook.service");
const cancel_innopay_transaction_consumer_1 = require("./webhooks/sqs/cancel-innopay-transaction.consumer");
const check_access_innopay_guid_consumer_1 = require("./webhooks/sqs/check-access-innopay-guid.consumer");
const complete_cash_out_innopay_transaction_consumer_1 = require("./webhooks/sqs/complete-cash-out-innopay-transaction.consumer");
const stucked_innopay_guid_status_consumer_1 = require("./webhooks/sqs/stucked-innopay-guid-status.consumer");
const consumers = [
    check_access_innopay_guid_consumer_1.CheckAccessInnopayGuidConsumer,
    stucked_innopay_guid_status_consumer_1.StuckedInnopayGuidStatusConsumer,
    cancel_innopay_transaction_consumer_1.CancelInnopayTransactionConsumer,
    complete_cash_out_innopay_transaction_consumer_1.CompleteCashOutInnopayTransactionConsumer,
];
const commands = [innopay_transaction_webhook_service_1.InnopayTransactionRestApiWebhookService, reverse_innopay_transaction_handler_1.ReverseInnopayTransactionHandler];
let InnopayTransactionModule = class InnopayTransactionModule {
};
InnopayTransactionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, import_ssut_sqs_module_1.importSsutSqsModule)({
                consumers: [
                    {
                        name: constants_1.SQSQueues.checkAccessInnopayGuidQueue.name,
                        queueUrl: constants_1.SQSQueues.checkAccessInnopayGuidQueue.url,
                        region: process.env.SQS_AWS_REGION_NAME,
                    },
                    {
                        name: constants_1.SQSQueues.stuckedInnopayGuidStatusQueue.name,
                        queueUrl: constants_1.SQSQueues.stuckedInnopayGuidStatusQueue.url,
                        region: process.env.SQS_AWS_REGION_NAME,
                    },
                    {
                        name: constants_1.SQSQueues.cancelInnopayTransactionQueue.name,
                        queueUrl: constants_1.SQSQueues.cancelInnopayTransactionQueue.url,
                        region: process.env.SQS_AWS_REGION_NAME,
                    },
                    {
                        name: constants_1.SQSQueues.completeCashOutInnopayTransactionQueue.name,
                        queueUrl: constants_1.SQSQueues.completeCashOutInnopayTransactionQueue.url,
                        region: process.env.SQS_AWS_REGION_NAME,
                    },
                ],
                producers: [],
            }),
            innopay_transaction_bulls_module_1.InnopayTransactionBullsModule,
            rental_context_domain_repositories_module_1.RentalContextDomainRepositoriesModule,
            innopay_payment_module_1.InnopayPaymentModule.forRootAsync(innopay_payment_factory_1.innopayPaymentFactory),
            cqrs_1.CqrsModule,
        ],
        controllers: [innopay_transaction_webhook_controller_1.InnopayTransactionRestApiWebhookController],
        providers: [...consumers, ...commands],
    })
], InnopayTransactionModule);
exports.InnopayTransactionModule = InnopayTransactionModule;
//# sourceMappingURL=innopay-transaction.module.js.map