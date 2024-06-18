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
exports.RevokeTemporaryContractHandler = void 0;
const chat_repository_1 = require("../../../../domain-repositories/chat/chat.repository");
const contract_request_repository_1 = require("../../../../domain-repositories/contract-request/contract-request.repository");
const contract_orm_mapper_1 = require("../../../../domain-repositories/contract/contract.orm-mapper");
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const message_repository_1 = require("../../../../domain-repositories/message/message.repository");
const temporary_payment_transaction_repository_1 = require("../../../../domain-repositories/temporary-payment-transaction/temporary-payment-transaction.repository");
const user_repository_1 = require("../../../../domain-repositories/user/user.repository");
const update_last_message_command_1 = require("../../../chat/commands/update-last-message/update-last-message.command");
const contract_entity_1 = require("../../domain/entities/contract.entity");
const message_entity_1 = require("../../../message/domain/entities/message.entity");
const types_1 = require("../../../message/domain/types");
const unit_of_work_1 = require("../../../../../infrastructure/database/unit-of-work/unit-of-work");
const enums_1 = require("../../../../../infrastructure/enums");
const pub_sub_service_1 = require("../../../../../modules/graphql-subscriptions/pub-sub.service");
const types_2 = require("../../../../../modules/graphql-subscriptions/types");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const revoke_temporary_contract_command_1 = require("./revoke-temporary-contract.command");
let RevokeTemporaryContractHandler = class RevokeTemporaryContractHandler {
    constructor(contractRepository, contractRequestRepository, messageRepository, chatRepository, temporaryPaymentTransactionRepository, userRepository, pubSubService, unitOfWork, commandBus) {
        this.contractRepository = contractRepository;
        this.contractRequestRepository = contractRequestRepository;
        this.messageRepository = messageRepository;
        this.chatRepository = chatRepository;
        this.temporaryPaymentTransactionRepository = temporaryPaymentTransactionRepository;
        this.userRepository = userRepository;
        this.pubSubService = pubSubService;
        this.unitOfWork = unitOfWork;
        this.commandBus = commandBus;
    }
    async execute(command) {
        const { contractId } = command;
        const contract = await this.contractRepository.findOneById(contractId.value);
        if (!contract) {
            throw new common_1.NotFoundException('Contract not found');
        }
        if (contract.shortTermRentBookingType === enums_1.ShortTermRentBookingType.INSTANT) {
            return this.revokeInstantBookingContract(contract);
        }
        return this.revokeChatBookingContract(contract);
    }
    async revokeInstantBookingContract(contract) {
        const trxId = await this.unitOfWork.start();
        try {
            const finingLandlord = async () => {
                if (contract.isFined) {
                    const landlord = await this.userRepository.findOneById(contract.landlordIdOrFail.value, trxId);
                    if (!landlord) {
                        throw new common_1.NotFoundException('Landlord not found');
                    }
                    landlord.fining();
                    return landlord;
                }
            };
            const [landlord, contractRequest] = await Promise.all([
                finingLandlord(),
                this.contractRequestRepository.findOneByContractId(contract.id.value, trxId),
            ]);
            await Promise.all([
                this.contractRepository.delete(contract, trxId),
                contractRequest ? this.contractRequestRepository.delete(contractRequest, trxId) : undefined,
                landlord ? this.userRepository.save(landlord, trxId) : undefined,
            ]);
            await this.unitOfWork.commit(trxId);
            this.publishContract(contract, types_2.ContractPubSubEvent.DELETED);
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
            throw error;
        }
    }
    async revokeChatBookingContract(contract) {
        contract.rollbackChatBookingTemporary();
        const trxId = await this.unitOfWork.start();
        try {
            const finingLandlord = async () => {
                if (contract.isFined) {
                    const landlord = await this.userRepository.findOneById(contract.landlordIdOrFail.value, trxId);
                    if (!landlord) {
                        throw new common_1.NotFoundException('Landlord not found');
                    }
                    landlord.fining();
                    return landlord;
                }
            };
            const [landlord, temporaryTransactions, chat] = await Promise.all([
                finingLandlord(),
                this.temporaryPaymentTransactionRepository.findByContractId(contract.id.value, trxId),
                this.chatRepository.findOneByContractId(contract.id.value, trxId),
            ]);
            if (!chat) {
                throw new common_1.NotFoundException('Chat not found');
            }
            await Promise.all([
                this.contractRepository.save(contract, trxId),
                temporaryTransactions.map((temporaryTransaction) => this.temporaryPaymentTransactionRepository.delete(temporaryTransaction, trxId)),
                this.sendSystemMessage({ chatId: chat.id, contract, tenantId: contract.tenantIdOrFail, trxId }),
                landlord ? this.userRepository.save(landlord, trxId) : undefined,
            ]);
            await this.unitOfWork.commit(trxId);
            this.publishContract(contract, types_2.ContractPubSubEvent.UPDATED);
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
            throw error;
        }
    }
    async sendSystemMessage({ chatId, tenantId, contract, trxId, }) {
        const message = message_entity_1.MessageEntity.create({
            chatId,
            senderId: tenantId,
            type: types_1.MessageType.SYSTEM,
            system: {
                type: types_1.SystemMessageType.TEMPORARY_BOOKING_REVOKE,
                contractData: contract.systemMessageData,
            },
        });
        await this.messageRepository.save(message, trxId);
        await this.commandBus.execute(new update_last_message_command_1.UpdateLastMessageCommand(chatId, trxId));
        return message;
    }
    async publishContract(contract, event) {
        const mapper = new contract_orm_mapper_1.ContractOrmMapper(contract_entity_1.ContractEntity);
        const ormContract = await mapper.toOrmEntity(contract);
        this.pubSubService.publish(pub_sub_service_1.PubSubTrigger.UPDATE_CONTRACT, {
            contract: ormContract,
            event,
        });
    }
};
RevokeTemporaryContractHandler = __decorate([
    (0, cqrs_1.CommandHandler)(revoke_temporary_contract_command_1.RevokeTemporaryContractCommand),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        contract_request_repository_1.ContractRequestRepository,
        message_repository_1.MessageRepository,
        chat_repository_1.ChatRepository,
        temporary_payment_transaction_repository_1.TemporaryPaymentTransactionRepository,
        user_repository_1.UserRepository,
        pub_sub_service_1.PubSubService,
        unit_of_work_1.UnitOfWork,
        cqrs_1.CommandBus])
], RevokeTemporaryContractHandler);
exports.RevokeTemporaryContractHandler = RevokeTemporaryContractHandler;
//# sourceMappingURL=revoke-temporary-contract.handler.js.map