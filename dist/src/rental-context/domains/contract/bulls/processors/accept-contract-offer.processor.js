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
exports.AcceptContractOfferProcessor = void 0;
const apartment_ad_repository_1 = require("../../../../domain-repositories/apartment-ad/apartment-ad.repository");
const chat_repository_1 = require("../../../../domain-repositories/chat/chat.repository");
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const innopay_card_repository_1 = require("../../../../domain-repositories/innopay-card/innopay-card.repository");
const payment_transaction_repository_1 = require("../../../../domain-repositories/payment-transaction/payment-transaction.repository");
const user_repository_1 = require("../../../../domain-repositories/user/user.repository");
const update_contract_payment_transaction_command_1 = require("../../commands/update-contract-payment-transaction/update-contract-payment-transaction.command");
const types_1 = require("../../../innopay-card/domain/types");
const push_system_message_command_1 = require("../../../message/commands/push-system-message/push-system-message.command");
const types_2 = require("../../../message/domain/types");
const system_first_contract_pay_command_1 = require("../../../payment-transaction/commands/system-first-contract-pay/system-first-contract-pay.command");
const unit_of_work_1 = require("../../../../../infrastructure/database/unit-of-work/unit-of-work");
const long_term_rent_document_repository_1 = require("../../../../../infrastructure/elastic-search/repositories/long-term-rent.document-repository");
const short_term_rent_document_repository_1 = require("../../../../../infrastructure/elastic-search/repositories/short-term-rent.document-repository");
const enums_1 = require("../../../../../infrastructure/enums");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const types_3 = require("../../../../../modules/graphql-subscriptions/types");
const contract_concluded_event_1 = require("../../../../../modules/notifications/services/contract-concluded/contract-concluded.event");
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const event_emitter_1 = require("@nestjs/event-emitter");
const Sentry = require("@sentry/node");
const contract_offer_pub_sub_service_1 = require("../services/contract-offer-pub-sub.service");
const types_4 = require("../types");
let AcceptContractOfferProcessor = class AcceptContractOfferProcessor {
    constructor(contractRepository, chatRepository, apartmentAdRepository, innopayCardRepository, paymentTransactionRepository, userRepository, longTermRentDocumentRepository, shortTermRentDocumentRepository, contractOfferPubSubService, unitOfWork, commandBus, eventEmitter) {
        this.contractRepository = contractRepository;
        this.chatRepository = chatRepository;
        this.apartmentAdRepository = apartmentAdRepository;
        this.innopayCardRepository = innopayCardRepository;
        this.paymentTransactionRepository = paymentTransactionRepository;
        this.userRepository = userRepository;
        this.longTermRentDocumentRepository = longTermRentDocumentRepository;
        this.shortTermRentDocumentRepository = shortTermRentDocumentRepository;
        this.contractOfferPubSubService = contractOfferPubSubService;
        this.unitOfWork = unitOfWork;
        this.commandBus = commandBus;
        this.eventEmitter = eventEmitter;
    }
    async handle(job) {
        var _a, _b, _c, _d;
        const { chatId, tenantId, cardId } = job.data;
        const contract = await this.contractRepository.findOneByTenantAndChatId(chatId, tenantId);
        if (!contract) {
            throw new common_1.NotFoundException(types_4.ContractExceptions.CONTRACT_NOT_FOUND);
        }
        if (!contract.isPending) {
            throw new exceptions_1.ArgumentInvalidException(types_4.ContractExceptions.CONTRACT_NOT_PENDING);
        }
        if (!contract.arrivalDate || !contract.departureDate) {
            throw new common_1.UnprocessableEntityException(types_4.ContractExceptions.ARRIVAL_AND_DEPARTURE_DATES_REQUIRED);
        }
        const isCardExist = await this.innopayCardRepository.isCardExist({
            cardId,
            userId: tenantId,
            appointmentType: types_1.InnopayAppointmentCardType.CHARGE_OFF,
        });
        if (!isCardExist) {
            throw new common_1.NotFoundException(types_4.ContractExceptions.INNOPAY_CARD_NOT_FOUND);
        }
        const apartmentAdId = contract.apartmentAdIdOrFail;
        const isApartmentFree = await this.contractRepository.checkApartmentIsFree({
            apartmentAdId: apartmentAdId.value,
            apartmentRentPeriodType: contract.apartmentRentPeriodType,
            selfContractId: contract.id.value,
            from: (_a = contract.arrivalDate) === null || _a === void 0 ? void 0 : _a.value,
            to: (_b = contract.departureDate) === null || _b === void 0 ? void 0 : _b.value,
        });
        if (!isApartmentFree) {
            throw new common_1.ConflictException(types_4.ContractExceptions.APARTMENT_IS_NOT_FREE);
        }
        let transactionsMeta = [];
        let paymentTransactionId;
        const landlord = await this.userRepository.findOneById(contract.landlordIdOrFail.value);
        if (!landlord) {
            throw new common_1.NotFoundException('Landlord not found');
        }
        const transactions = contract.acceptOffer(new uuid_value_object_1.UUID(cardId));
        contract.endPending();
        landlord.resetFine();
        const trxId = await this.unitOfWork.start();
        try {
            await Promise.all([this.contractRepository.save(contract, trxId), this.userRepository.save(landlord, trxId)]);
            await Promise.all(transactions.map((transaction) => this.paymentTransactionRepository.save(transaction, trxId)));
            await this.unitOfWork.commit(trxId);
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
        }
        try {
            const { id, customerReference } = await this.payContractOrFail(contract.id);
            paymentTransactionId = id;
            const attachedCardId = cardId || contract.tenantPaymentCardOrFail;
            const paymentCard = await this.innopayCardRepository.findOneById(attachedCardId);
            transactionsMeta = transactions.map((t) => {
                if (t.id.equals(paymentTransactionId)) {
                    if (paymentCard) {
                        t.cashInSuccess(paymentCard.cardMeta, { customerReference });
                    }
                    return t.metaInfo;
                }
                return t.metaInfo;
            });
            this.contractOfferPubSubService.publishContract(contract, types_3.ContractPubSubEvent.UPDATED);
            this.commandBus.execute(new update_contract_payment_transaction_command_1.UpdateContractPaymentTransactionCommand(contract.id));
        }
        catch (error) {
            contract.acceptOfferDown();
            await this.contractRepository.save(contract);
            await this.paymentTransactionRepository.deleteByContractId(contract.id.value);
            this.contractOfferPubSubService.publishContract(contract, types_3.ContractPubSubEvent.UPDATED, error.message);
            throw error;
        }
        try {
            await this.cancellationIntersectedContractsByDates({
                apartmentAdId,
                apartmentRentPeriodType: contract.apartmentRentPeriodType,
                arrivalDate: (_c = contract.arrivalDate) === null || _c === void 0 ? void 0 : _c.getDate(),
                departureDate: (_d = contract.departureDate) === null || _d === void 0 ? void 0 : _d.getDate(),
            });
        }
        catch (error) {
            common_1.Logger.log(error);
            Sentry.captureException(error);
        }
        try {
            await this.pausePublishingApartmentAd(apartmentAdId.value, contract.apartmentRentPeriodType);
        }
        catch (error) {
            common_1.Logger.log(error);
            Sentry.captureException(error);
        }
        try {
            const chat = await this.findChatByContract(contract.id.value, tenantId);
            const message = await this.commandBus.execute(new push_system_message_command_1.PushSystemMessageCommand({
                chatId: chat.id,
                senderId: contract.tenantIdOrFail,
                content: {
                    type: types_2.SystemMessageType.BOOKING_CONCLUDED,
                    contractData: { ...contract.systemMessageData, transactionsMeta },
                },
            }));
            if (message.isErr()) {
                throw message.unwrapErr();
            }
            this.contractOfferPubSubService.publishMessage(message.unwrap(), chat);
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
        catch (error) {
            common_1.Logger.log(error);
            Sentry.captureException(error);
        }
    }
    async payContractOrFail(contractId) {
        const payResult = await this.commandBus.execute(new system_first_contract_pay_command_1.SystemFirstContractPayCommand(contractId));
        if (payResult.isErr()) {
            throw payResult.unwrapErr();
        }
        const paymentTransactionId = payResult.unwrap();
        return paymentTransactionId;
    }
    async findChatByContract(contractId, tenantId) {
        var _a;
        const chat = await this.chatRepository.findByContractIdAndMemberId(contractId, tenantId);
        if (!chat) {
            throw new common_1.NotFoundException(types_4.ContractExceptions.CHAT_NOT_FOUND);
        }
        if (!((_a = chat.members) === null || _a === void 0 ? void 0 : _a.length)) {
            throw new exceptions_1.ArgumentInvalidException(types_4.ContractExceptions.CHAT_MEMBER_REQUIRED);
        }
        return chat;
    }
    async cancellationIntersectedContractsByDates(props) {
        var _a, _b;
        const contracts = await this.contractRepository.findManyForReject({
            apartmentAdId: props.apartmentAdId.value,
            apartmentRentPeriodType: props.apartmentRentPeriodType,
            from: (_a = props.arrivalDate) === null || _a === void 0 ? void 0 : _a.toISOString(),
            to: (_b = props.departureDate) === null || _b === void 0 ? void 0 : _b.toISOString(),
        });
        await Promise.all(contracts.map((contract) => {
            contract.reject();
            return this.contractRepository.save(contract);
        }));
    }
    async pausePublishingApartmentAd(apartmentAdId, rentPeriodType) {
        const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId);
        if (!apartmentAd) {
            throw new common_1.NotFoundException(types_4.ContractExceptions.APARTMENT_AD_NOT_FOUND);
        }
        apartmentAd === null || apartmentAd === void 0 ? void 0 : apartmentAd.pausePublishingByAcceptContract(rentPeriodType);
        if (rentPeriodType === enums_1.ApartmentRentPeriodType.LONG_TERM && apartmentAd.longTermRentId) {
            await this.longTermRentDocumentRepository.delete(apartmentAd);
        }
        if (apartmentAd.isShortTermRent && apartmentAd.isShortTermRentPublished) {
            await this.shortTermRentDocumentRepository.update(apartmentAd);
        }
        await this.apartmentAdRepository.save(apartmentAd);
    }
};
__decorate([
    (0, bull_1.Process)(types_4.ContractOfferProcess.ACCEPT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AcceptContractOfferProcessor.prototype, "handle", null);
AcceptContractOfferProcessor = __decorate([
    (0, bull_1.Processor)(types_4.ContractBulls.CONTRACT_OFFER_QUEUE),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        chat_repository_1.ChatRepository,
        apartment_ad_repository_1.ApartmentAdRepository,
        innopay_card_repository_1.InnopayCardRepository,
        payment_transaction_repository_1.PaymentTransactionRepository,
        user_repository_1.UserRepository,
        long_term_rent_document_repository_1.LongTermRentDocumentRepository,
        short_term_rent_document_repository_1.ShortTermRentDocumentRepository,
        contract_offer_pub_sub_service_1.ContractOfferPubSubService,
        unit_of_work_1.UnitOfWork,
        cqrs_1.CommandBus,
        event_emitter_1.EventEmitter2])
], AcceptContractOfferProcessor);
exports.AcceptContractOfferProcessor = AcceptContractOfferProcessor;
//# sourceMappingURL=accept-contract-offer.processor.js.map