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
exports.RejectContractOfferProcessor = void 0;
const chat_repository_1 = require("../../../../domain-repositories/chat/chat.repository");
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const push_system_message_command_1 = require("../../../message/commands/push-system-message/push-system-message.command");
const types_1 = require("../../../message/domain/types");
const unit_of_work_1 = require("../../../../../infrastructure/database/unit-of-work/unit-of-work");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const types_2 = require("../../../../../modules/graphql-subscriptions/types");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const contract_offer_pub_sub_service_1 = require("../services/contract-offer-pub-sub.service");
const types_3 = require("../types");
let RejectContractOfferProcessor = class RejectContractOfferProcessor {
    constructor(contractRepository, chatRepository, contractOfferPubSubService, unitOfWork, commandBus) {
        this.contractRepository = contractRepository;
        this.chatRepository = chatRepository;
        this.contractOfferPubSubService = contractOfferPubSubService;
        this.unitOfWork = unitOfWork;
        this.commandBus = commandBus;
    }
    async handle(job) {
        const { chatId, userId, rejectTrigger } = job.data;
        const trxId = await this.unitOfWork.start();
        try {
            const contract = await this.contractRepository.findOneByMemberAndChatId(chatId, userId, trxId);
            if (!contract) {
                throw new common_1.NotFoundException(types_3.ContractExceptions.CONTRACT_NOT_FOUND);
            }
            if (!contract.isPending) {
                throw new exceptions_1.ArgumentInvalidException(types_3.ContractExceptions.CONTRACT_NOT_PENDING);
            }
            contract.rejectOffer();
            contract.endPending();
            await this.contractRepository.save(contract, trxId);
            const chat = await this.findChatByContract(contract.id.value, userId, trxId);
            const systemMessageTypeMapper = {
                [types_3.RejectTrigger.SYSTEM]: types_1.SystemMessageType.OFFER_REJECTED_BY_SYSTEM,
                [types_3.RejectTrigger.USER]: types_1.SystemMessageType.OFFER_REJECTED,
            };
            const message = await this.commandBus.execute(new push_system_message_command_1.PushSystemMessageCommand({
                chatId: chat.id,
                senderId: new uuid_value_object_1.UUID(userId),
                content: { type: systemMessageTypeMapper[rejectTrigger], contractData: contract.systemMessageData },
            }, trxId));
            if (message.isErr()) {
                throw message.unwrapErr();
            }
            await this.unitOfWork.execute(trxId);
            return Promise.all([
                this.contractOfferPubSubService.publishMessage(message.unwrap(), chat),
                this.contractOfferPubSubService.publishContract(contract, types_2.ContractPubSubEvent.UPDATED),
            ]);
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
            const contract = await this.contractRepository.findOneByMemberAndChatId(chatId, userId);
            if (!contract) {
                throw new common_1.NotFoundException(types_3.ContractExceptions.CONTRACT_NOT_FOUND);
            }
            contract.endPending();
            await this.contractRepository.save(contract);
            await this.contractOfferPubSubService.publishContract(contract, types_2.ContractPubSubEvent.UPDATED, error.message);
            throw error;
        }
    }
    async findChatByContract(contractId, userId, trxId) {
        var _a;
        const chat = await this.chatRepository.findByContractIdAndMemberId(contractId, userId, trxId);
        if (!chat) {
            throw new common_1.NotFoundException(types_3.ContractExceptions.CHAT_NOT_FOUND);
        }
        if (!((_a = chat.members) === null || _a === void 0 ? void 0 : _a.length)) {
            throw new exceptions_1.ArgumentInvalidException(types_3.ContractExceptions.CHAT_MEMBER_REQUIRED);
        }
        return chat;
    }
};
__decorate([
    (0, bull_1.Process)(types_3.ContractOfferProcess.REJECT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RejectContractOfferProcessor.prototype, "handle", null);
RejectContractOfferProcessor = __decorate([
    (0, bull_1.Processor)(types_3.ContractBulls.CONTRACT_OFFER_QUEUE),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        chat_repository_1.ChatRepository,
        contract_offer_pub_sub_service_1.ContractOfferPubSubService,
        unit_of_work_1.UnitOfWork,
        cqrs_1.CommandBus])
], RejectContractOfferProcessor);
exports.RejectContractOfferProcessor = RejectContractOfferProcessor;
//# sourceMappingURL=reject-contract-offer.processor.js.map