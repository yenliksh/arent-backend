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
exports.ModifyContractToPermanentHandler = void 0;
const chat_repository_1 = require("../../../../domain-repositories/chat/chat.repository");
const contract_request_repository_1 = require("../../../../domain-repositories/contract-request/contract-request.repository");
const contract_orm_mapper_1 = require("../../../../domain-repositories/contract/contract.orm-mapper");
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const message_orm_mapper_1 = require("../../../../domain-repositories/message/message.orm-mapper");
const payment_transaction_orm_mapper_1 = require("../../../../domain-repositories/payment-transaction/payment-transaction.orm-mapper");
const payment_transaction_repository_1 = require("../../../../domain-repositories/payment-transaction/payment-transaction.repository");
const temporary_payment_transaction_repository_1 = require("../../../../domain-repositories/temporary-payment-transaction/temporary-payment-transaction.repository");
const user_repository_1 = require("../../../../domain-repositories/user/user.repository");
const pause_apartment_ad_by_type_command_1 = require("../../../apartment-ad/commands/pause-apartment-ad/pause-apartment-ad-by-type.command");
const create_chat_command_1 = require("../../../chat/commands/create-chat/create-chat.command");
const rental_date_guard_1 = require("../../base-classes/rental-guards/rental-date.guard");
const contract_entity_1 = require("../../domain/entities/contract.entity");
const add_charge_off_card_command_1 = require("../../../innopay-card/commands/add-charge-off-card/add-charge-off-card.command");
const push_system_message_command_1 = require("../../../message/commands/push-system-message/push-system-message.command");
const message_entity_1 = require("../../../message/domain/entities/message.entity");
const types_1 = require("../../../message/domain/types");
const complete_first_cash_in_contract_command_1 = require("../../../payment-transaction/commands/complete-first-cash-in-contract/complete-first-cash-in-contract.command");
const payment_transaction_entity_1 = require("../../../payment-transaction/domain/entities/payment-transaction.entity");
const unit_of_work_1 = require("../../../../../infrastructure/database/unit-of-work/unit-of-work");
const enums_1 = require("../../../../../infrastructure/enums");
const date_util_1 = require("../../../../../libs/utils/date-util");
const pub_sub_service_1 = require("../../../../../modules/graphql-subscriptions/pub-sub.service");
const types_2 = require("../../../../../modules/graphql-subscriptions/types");
const contract_concluded_event_1 = require("../../../../../modules/notifications/services/contract-concluded/contract-concluded.event");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const event_emitter_1 = require("@nestjs/event-emitter");
const reject_intersected_contracts_command_1 = require("../reject-intersected-contracts/reject-intersected-contracts.command");
const update_contract_payment_transaction_command_1 = require("../update-contract-payment-transaction/update-contract-payment-transaction.command");
const modify_contract_to_permanent_command_1 = require("./modify-contract-to-permanent.command");
let ModifyContractToPermanentHandler = class ModifyContractToPermanentHandler {
    constructor(contractRepository, contractRequestRepository, temporaryPaymentTransactionRepository, paymentTransactionRepository, chatRepository, userRepository, pubSubService, commandBus, unitOfWork, eventEmitter) {
        this.contractRepository = contractRepository;
        this.contractRequestRepository = contractRequestRepository;
        this.temporaryPaymentTransactionRepository = temporaryPaymentTransactionRepository;
        this.paymentTransactionRepository = paymentTransactionRepository;
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
        this.pubSubService = pubSubService;
        this.commandBus = commandBus;
        this.unitOfWork = unitOfWork;
        this.eventEmitter = eventEmitter;
    }
    async execute(command) {
        const { contractId } = command;
        const { cnpCardId, cnpUserId } = command.cardProps;
        const [contract, temporaryPaymentTransactions] = await Promise.all([
            this.contractRepository.findOneById(contractId.value),
            this.temporaryPaymentTransactionRepository.findByContractId(contractId.value),
        ]);
        if (!contract) {
            throw new common_1.NotFoundException('Contract not found');
        }
        const customerReference = contract.paymentDataOrFail.customerReference;
        let paymentTransactions;
        let transactionsMeta = [];
        let firstPaymentTransactionId;
        const trxId = await this.unitOfWork.start();
        try {
            const cardResult = await this.commandBus.execute(new add_charge_off_card_command_1.AddChargeOffCardCommand({ userId: contract.tenantIdOrFail, customerReference, cnpCardId, cnpUserId }, trxId));
            if (cardResult.isErr()) {
                throw cardResult.unwrapErr();
            }
            contract.modifyToPermanent(cardResult.unwrap());
            paymentTransactions = this.createPaymentTransactionByTemporary(temporaryPaymentTransactions, contract);
            transactionsMeta = paymentTransactions === null || paymentTransactions === void 0 ? void 0 : paymentTransactions.map((t) => t.metaInfo);
            const createChatForInstantBooking = async () => {
                if (contract.shortTermRentBookingType === enums_1.ShortTermRentBookingType.INSTANT) {
                    await this.commandBus.execute(new create_chat_command_1.CreateChatCommand({ contractId, transactionsMeta, systemMessageType: types_1.SystemMessageType.INSTANT_BOOKING }, trxId));
                }
            };
            const temporaryTransactions = await this.temporaryPaymentTransactionRepository.findByContractId(contract.id.value, trxId);
            await Promise.all([
                this.contractRepository.save(contract, trxId),
                temporaryTransactions.map((temporaryTransaction) => this.temporaryPaymentTransactionRepository.delete(temporaryTransaction, trxId)),
                paymentTransactions.map((paymentTransaction) => this.paymentTransactionRepository.save(paymentTransaction, trxId)),
                createChatForInstantBooking(),
            ]);
            await this.unitOfWork.commit(trxId);
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
            throw error;
        }
        try {
            const payRes = await this.commandBus.execute(new complete_first_cash_in_contract_command_1.CompleteFirstCashInContractCommand(contractId, customerReference));
            if (payRes.isErr()) {
                throw payRes.unwrapErr();
            }
            firstPaymentTransactionId = payRes.unwrap();
        }
        catch (error) {
            if (contract.shortTermRentBookingType === enums_1.ShortTermRentBookingType.INSTANT) {
                await this.permanentInstantContractDown(contract);
                throw error;
            }
            await this.permanentRequestContractDown(contract);
            throw error;
        }
        await Promise.all([
            this.publishContract(contract, types_2.ContractPubSubEvent.UPDATED),
            paymentTransactions.map((paymentTransaction) => this.publishPaymentTransaction(paymentTransaction)),
        ]);
        this.commandBus.execute(new reject_intersected_contracts_command_1.RejectIntersectedContractsCommand(contractId));
        this.commandBus.execute(new update_contract_payment_transaction_command_1.UpdateContractPaymentTransactionCommand(contractId));
        if (contract.shortTermRentBookingType !== enums_1.ShortTermRentBookingType.INSTANT) {
            this.sendSystemMessage(contract, { paymentTransactionId: firstPaymentTransactionId, transactionsMeta });
        }
        if (contract.apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.LONG_TERM) {
            this.commandBus.execute(new pause_apartment_ad_by_type_command_1.PauseApartmentAdByTypeCommand(contract.apartmentAdIdOrFail.value, contract.apartmentRentPeriodType));
        }
    }
    createPaymentTransactionByTemporary(temporaryTransactions, contract) {
        const rentalDateGuard = new rental_date_guard_1.RentalDateGuard(contract.rentPeriodVersion, contract.status.value);
        const rentPeriodStrategyType = rentalDateGuard.defineRentPeriodStrategyType({
            arrivalDate: contract.arrivalDateOrFail,
            departureDate: contract.departureDateOrFail,
        }, contract.apartmentRentPeriodType);
        return temporaryTransactions
            .sort((a, b) => (date_util_1.DateUtil.parseUTC(a.withdrawFundsDate).isAfter(b.withdrawFundsDate) ? 1 : -1))
            .map((temporaryTransaction, index) => {
            const props = temporaryTransaction.getPropsCopy();
            return payment_transaction_entity_1.PaymentTransactionEntity.create({
                contractId: props.contractId,
                cost: props.cost,
                endDate: props.endDate,
                recipientTaxRate: props.recipientTaxRate,
                rentDays: props.rentDays,
                senderTaxRate: props.senderTaxRate,
                startDate: props.startDate,
                taxAmount: props.taxAmount,
                totalAmountPayable: props.totalAmountPayable,
                totalAmountToBeTransferred: props.totalAmountToBeTransferred,
                totalRevenue: props.totalRevenue,
                withdrawFundsDate: props.withdrawFundsDate,
                isLastPayment: index === temporaryTransactions.length - 1,
                isRecurring: !!index && temporaryTransactions.length > 1,
                recipientId: contract.landlordIdOrFail,
                rentPeriodStrategyType,
                senderId: contract.tenantIdOrFail,
            });
        });
    }
    async sendSystemMessage(contract, paymentTransactionProps) {
        const { paymentTransactionId, transactionsMeta } = paymentTransactionProps;
        const chat = await this.chatRepository.findByContractIdAndMemberId(contract.id.value, contract.tenantIdOrFail.value);
        if (!chat) {
            throw new common_1.NotFoundException('Chat not found');
        }
        const message = await this.commandBus.execute(new push_system_message_command_1.PushSystemMessageCommand({
            chatId: chat.id,
            senderId: contract.tenantIdOrFail,
            content: {
                type: types_1.SystemMessageType.BOOKING_CONCLUDED,
                contractData: { ...contract.systemMessageData, transactionsMeta },
            },
        }));
        if (message.isErr()) {
            throw message.unwrapErr();
        }
        this.publishMessage(message.unwrap(), chat);
        if (contract.landlord && contract.tenant) {
            this.eventEmitter.emit(contract_concluded_event_1.ContractConcludedEvent.eventName, contract_concluded_event_1.ContractConcludedEvent.create({
                contractId: contract.id,
                paymentTransactionId,
                chatId: chat.id,
                landlordId: contract.landlord,
                tenantId: contract.tenant,
            }));
        }
    }
    async publishContract(contract, event) {
        const mapper = new contract_orm_mapper_1.ContractOrmMapper(contract_entity_1.ContractEntity);
        const ormContract = await mapper.toOrmEntity(contract);
        this.pubSubService.publish(pub_sub_service_1.PubSubTrigger.UPDATE_CONTRACT, {
            contract: ormContract,
            event,
        });
    }
    async publishMessage(message, chat) {
        const { members } = chat;
        const mapper = new message_orm_mapper_1.MessageOrmMapper(message_entity_1.MessageEntity);
        const ormMessage = await mapper.toOrmEntity(message);
        await this.pubSubService.publish(pub_sub_service_1.PubSubTrigger.NEW_MESSAGE, {
            message: ormMessage,
            chatMembers: members
                .map((member) => ({ [member.memberId.value]: member.role }))
                .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
        });
    }
    async publishPaymentTransaction(paymentTransaction) {
        const mapper = new payment_transaction_orm_mapper_1.PaymentTransactionOrmMapper(payment_transaction_entity_1.PaymentTransactionEntity);
        const ormPaymentTransaction = await mapper.toOrmEntity(paymentTransaction);
        this.pubSubService.publish(pub_sub_service_1.PubSubTrigger.UPDATE_PAYMENT_TRANSACTION, {
            paymentTransaction: ormPaymentTransaction,
            cardOwnerId: paymentTransaction.senderId.value,
            event: types_2.PaymentTransactionPubSubEvent.UPDATED,
        });
    }
    async permanentInstantContractDown(contract) {
        await Promise.all([
            this.paymentTransactionRepository.deleteByContractId(contract.id.value),
            this.contractRepository.delete(contract),
            this.contractRequestRepository.findOneByContractId(contract.id.value),
        ]);
        this.publishContract(contract, types_2.ContractPubSubEvent.DELETED);
    }
    async permanentRequestContractDown(contract) {
        contract.acceptOfferDown();
        let landlord;
        if (contract.isFined) {
            landlord = await this.userRepository.findOneById(contract.landlordIdOrFail.value);
            if (!landlord) {
                throw new common_1.NotFoundException('Landlord not found');
            }
            landlord.fining();
        }
        await Promise.all([
            this.contractRepository.save(contract),
            this.paymentTransactionRepository.deleteByContractId(contract.id.value),
            landlord ? this.userRepository.save(landlord) : undefined,
        ]);
        this.publishContract(contract, types_2.ContractPubSubEvent.UPDATED);
    }
};
ModifyContractToPermanentHandler = __decorate([
    (0, cqrs_1.CommandHandler)(modify_contract_to_permanent_command_1.ModifyContractToPermanentCommand),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        contract_request_repository_1.ContractRequestRepository,
        temporary_payment_transaction_repository_1.TemporaryPaymentTransactionRepository,
        payment_transaction_repository_1.PaymentTransactionRepository,
        chat_repository_1.ChatRepository,
        user_repository_1.UserRepository,
        pub_sub_service_1.PubSubService,
        cqrs_1.CommandBus,
        unit_of_work_1.UnitOfWork,
        event_emitter_1.EventEmitter2])
], ModifyContractToPermanentHandler);
exports.ModifyContractToPermanentHandler = ModifyContractToPermanentHandler;
//# sourceMappingURL=modify-contract-to-permanent.handler.js.map