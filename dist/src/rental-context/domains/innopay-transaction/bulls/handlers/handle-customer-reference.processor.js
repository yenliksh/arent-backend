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
exports.HandleCustomerReferenceProcessor = void 0;
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const modify_contract_to_permanent_command_1 = require("../../../contract/commands/modify-contract-to-permanent/modify-contract-to-permanent.command");
const revoke_temporary_contract_command_1 = require("../../../contract/commands/revoke-temporary-contract/revoke-temporary-contract.command");
const exceptions_1 = require("../../../../../libs/exceptions");
const sleep_1 = require("../../../../../libs/utils/sleep");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const Sentry = require("@sentry/node");
const innopay_status_service_1 = require("../../../../../third-parties/innopay-payment/src/services/innopay-status.service");
const stucked_innopay_guid_status_producer_1 = require("../sqs-producers/stucked-innopay-guid-status.producer");
const types_1 = require("../types");
let HandleCustomerReferenceProcessor = class HandleCustomerReferenceProcessor {
    constructor(contractRepository, sqsProducer, innopayStatusService, commandBus) {
        this.contractRepository = contractRepository;
        this.sqsProducer = sqsProducer;
        this.innopayStatusService = innopayStatusService;
        this.commandBus = commandBus;
        this.innopayStateMapper = {
            [innopay_status_service_1.InnopayTransactionState.SUCCESS]: ({ contractId, customerReference }) => this.handleSuccessState(contractId, customerReference),
            [innopay_status_service_1.InnopayTransactionState.READY_TO_COMPLETE]: ({ contractId, cardInfo }) => this.handleReadyToCompleteState(contractId, cardInfo),
            [innopay_status_service_1.InnopayTransactionState.IN_PROGRESS]: ({ customerReference, iteration }) => this.handleInProgressState(customerReference, iteration),
            [innopay_status_service_1.InnopayTransactionState.FAILED]: ({ contractId, customerReference }) => this.handleFailedState(contractId, customerReference),
        };
    }
    async handle(job) {
        const { customerReference, iteration = 0 } = job.data;
        try {
            const [contract, innopayTransactionInfo] = await Promise.all([
                this.contractRepository.findByCustomerReference(customerReference),
                this.innopayStatusService.getCashInTransactionInfo(customerReference),
            ]);
            if (!contract) {
                return;
            }
            const { transactionState, cardInfo } = innopayTransactionInfo;
            await this.innopayStateMapper[transactionState]({
                contractId: contract.id,
                customerReference,
                iteration,
                cardInfo: cardInfo
                    ? {
                        cnpCardId: Number(cardInfo.cardId),
                        cnpUserId: Number(cardInfo.userId),
                    }
                    : undefined,
            });
        }
        catch (error) {
            common_1.Logger.error(error);
            Sentry.captureException(`Customer reference with id: ${customerReference} failed`);
            return;
        }
        await (0, sleep_1.sleep)(1000);
    }
    async handleSuccessState(contractId, customerReference) {
        throw new common_1.BadRequestException(`Customer reference = '${customerReference}' for contract id='${contractId.value}' already completed`);
    }
    async handleReadyToCompleteState(contractId, card) {
        if (!card) {
            throw new exceptions_1.ArgumentInvalidException('Card info not found');
        }
        const { cnpCardId, cnpUserId } = card;
        await this.commandBus.execute(new modify_contract_to_permanent_command_1.ModifyContractToPermanentCommand(contractId, {
            cnpCardId,
            cnpUserId,
        }));
    }
    async handleInProgressState(customerReference, iteration) {
        this.sqsProducer.send({
            customerReference,
            iteration,
        });
    }
    async handleFailedState(contractId, customerReference) {
        Sentry.captureException(`Customer reference with id: ${customerReference} failed`);
        common_1.Logger.log(`Customer reference with id: ${customerReference} failed`);
        this.commandBus.execute(new revoke_temporary_contract_command_1.RevokeTemporaryContractCommand(contractId));
    }
};
__decorate([
    (0, bull_1.Process)(types_1.InnopayTransactionProcess.HANDLE_CUSTOMER_REFERENCE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HandleCustomerReferenceProcessor.prototype, "handle", null);
HandleCustomerReferenceProcessor = __decorate([
    (0, bull_1.Processor)(types_1.InnopayBulls.INNOPAY_TRANSACTION),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        stucked_innopay_guid_status_producer_1.StuckedInnopayGuidStatusProducer,
        innopay_status_service_1.InnopayStatusService,
        cqrs_1.CommandBus])
], HandleCustomerReferenceProcessor);
exports.HandleCustomerReferenceProcessor = HandleCustomerReferenceProcessor;
//# sourceMappingURL=handle-customer-reference.processor.js.map