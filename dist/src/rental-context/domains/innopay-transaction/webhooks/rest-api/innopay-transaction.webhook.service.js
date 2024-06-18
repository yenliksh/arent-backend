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
exports.InnopayTransactionRestApiWebhookService = void 0;
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const modify_contract_to_permanent_command_1 = require("../../../contract/commands/modify-contract-to-permanent/modify-contract-to-permanent.command");
const revoke_temporary_contract_command_1 = require("../../../contract/commands/revoke-temporary-contract/revoke-temporary-contract.command");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const Sentry = require("@sentry/node");
const innopay_status_service_1 = require("../../../../../third-parties/innopay-payment/src/services/innopay-status.service");
const oxide_ts_1 = require("oxide.ts");
const stucked_innopay_guid_status_producer_1 = require("../../bulls/sqs-producers/stucked-innopay-guid-status.producer");
let InnopayTransactionRestApiWebhookService = class InnopayTransactionRestApiWebhookService {
    constructor(contractRepository, sqsProducer, innopayStatusService, commandBus) {
        this.contractRepository = contractRepository;
        this.sqsProducer = sqsProducer;
        this.innopayStatusService = innopayStatusService;
        this.commandBus = commandBus;
        this.innopayStateMapper = {
            [innopay_status_service_1.InnopayTransactionState.SUCCESS]: ({ contractId, customerReference }) => this.handleSuccessState(contractId, customerReference),
            [innopay_status_service_1.InnopayTransactionState.READY_TO_COMPLETE]: ({ contractId, cnpCardId, cnpUserId }) => this.handleReadyToCompleteState(contractId, { cnpCardId, cnpUserId }),
            [innopay_status_service_1.InnopayTransactionState.IN_PROGRESS]: ({ customerReference, iteration }) => this.handleInProgressState(customerReference, iteration),
            [innopay_status_service_1.InnopayTransactionState.FAILED]: ({ contractId, customerReference }) => this.handleFailedState(contractId, customerReference),
        };
        this.responseByState = {
            [innopay_status_service_1.InnopayTransactionState.SUCCESS]: (0, oxide_ts_1.Err)(new common_1.BadGatewayException('Transaction already complete')),
            [innopay_status_service_1.InnopayTransactionState.READY_TO_COMPLETE]: (0, oxide_ts_1.Ok)(true),
            [innopay_status_service_1.InnopayTransactionState.IN_PROGRESS]: (0, oxide_ts_1.Ok)(false),
            [innopay_status_service_1.InnopayTransactionState.FAILED]: (0, oxide_ts_1.Err)(new common_1.BadGatewayException('Something went wrong')),
        };
    }
    async handle(dto) {
        const { cardId, customerReference, userId } = dto;
        try {
            const [contract, innopayTransactionInfo] = await Promise.all([
                this.contractRepository.findByCustomerReference(customerReference),
                this.innopayStatusService.getCashInTransactionInfo(customerReference),
            ]);
            if (!contract) {
                throw new common_1.BadGatewayException(`Contract with customerReference=${customerReference} not found`);
            }
            const { transactionState } = innopayTransactionInfo;
            await this.innopayStateMapper[transactionState]({
                contractId: contract.id,
                customerReference,
                iteration: 0,
                cnpCardId: cardId,
                cnpUserId: userId,
            });
            return this.responseByState[transactionState];
        }
        catch (error) {
            common_1.Logger.error(error);
            Sentry.captureException(error);
            return (0, oxide_ts_1.Err)(new common_1.BadGatewayException('Something went wrong'));
        }
    }
    async handleSuccessState(contractId, customerReference) {
        throw new common_1.BadRequestException(`Customer reference = '${customerReference}' for contract id='${contractId.value}' already completed`);
    }
    async handleReadyToCompleteState(contractId, card) {
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
InnopayTransactionRestApiWebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        stucked_innopay_guid_status_producer_1.StuckedInnopayGuidStatusProducer,
        innopay_status_service_1.InnopayStatusService,
        cqrs_1.CommandBus])
], InnopayTransactionRestApiWebhookService);
exports.InnopayTransactionRestApiWebhookService = InnopayTransactionRestApiWebhookService;
//# sourceMappingURL=innopay-transaction.webhook.service.js.map