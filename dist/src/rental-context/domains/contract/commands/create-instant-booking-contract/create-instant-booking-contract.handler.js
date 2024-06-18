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
exports.CreateInstantContractHandler = void 0;
const apartment_ad_repository_1 = require("../../../../domain-repositories/apartment-ad/apartment-ad.repository");
const chat_repository_1 = require("../../../../domain-repositories/chat/chat.repository");
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const innopay_card_repository_1 = require("../../../../domain-repositories/innopay-card/innopay-card.repository");
const message_orm_mapper_1 = require("../../../../domain-repositories/message/message.orm-mapper");
const message_repository_1 = require("../../../../domain-repositories/message/message.repository");
const user_repository_1 = require("../../../../domain-repositories/user/user.repository");
const cancellation_policy_value_object_1 = require("../../../../domain-value-objects/cancellation-policy.value-object");
const payment_method_value_object_1 = require("../../../../domain-value-objects/payment-method.value-object");
const rent_booking_type_value_object_1 = require("../../../../domain-value-objects/rent-booking-type.value-object");
const update_last_message_command_1 = require("../../../chat/commands/update-last-message/update-last-message.command");
const chat_entity_1 = require("../../../chat/domain/entities/chat.entity");
const types_1 = require("../../../chat/domain/types");
const specify_payment_method_problem_1 = require("../../../contract-request/problems/specify-payment-method.problem");
const contract_entity_1 = require("../../domain/entities/contract.entity");
const base_contract_apartment_ad_data_value_object_1 = require("../../domain/value-objects/base-contract-apartment-ad-data.value-object");
const types_2 = require("../../../innopay-card/domain/types");
const message_entity_1 = require("../../../message/domain/entities/message.entity");
const types_3 = require("../../../message/domain/types");
const enums_1 = require("../../../../../infrastructure/enums");
const exceptions_1 = require("../../../../../libs/exceptions");
const pub_sub_service_1 = require("../../../../../modules/graphql-subscriptions/pub-sub.service");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const create_instant_booking_contract_command_1 = require("./create-instant-booking-contract.command");
let CreateInstantContractHandler = class CreateInstantContractHandler {
    constructor(contractRepository, chatRepository, messageRepository, apartmentAdRepository, innopayCardRepository, userRepository, pubSubService, commandBus) {
        this.contractRepository = contractRepository;
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
        this.apartmentAdRepository = apartmentAdRepository;
        this.innopayCardRepository = innopayCardRepository;
        this.userRepository = userRepository;
        this.pubSubService = pubSubService;
        this.commandBus = commandBus;
    }
    async execute(command) {
        const { contractRequest, cardId, trxId } = command;
        const tenantId = contractRequest.tenantIdOrFail;
        await this.checkCardExist(cardId, tenantId, trxId);
        const contract = await this.createContract(contractRequest, cardId, trxId);
        const chat = await this.createChat(contract, trxId);
        const message = await this.sendSystemMessage({
            chatId: chat.id,
            tenantId,
            comment: contractRequest.comment,
            contract,
            trxId,
        });
        this.publishMessage(message, chat);
        return [contract.id, chat.id];
    }
    async checkCardExist(cardId, tenantId, trxId) {
        const isCardExist = await this.innopayCardRepository.isCardExist({ cardId: cardId.value, userId: tenantId.value, appointmentType: types_2.InnopayAppointmentCardType.CHARGE_OFF }, trxId);
        if (!isCardExist) {
            throw new specify_payment_method_problem_1.SpecifyPaymentMethodProblem();
        }
    }
    async createContract(contractRequest, cardId, trxId) {
        const { apartmentRentPeriodType, arrivalDate, departureDate, shortTermRentPaymentType, guests, apartmentAdId, rentPeriodVersion, landlordId, tenantId, } = contractRequest.getRequiredDataForContract();
        const [apartmentAd, landlord] = await Promise.all([
            this.apartmentAdRepository.findOneById(apartmentAdId.value, trxId),
            this.userRepository.findOneById(landlordId.value, trxId),
        ]);
        if (!apartmentAd) {
            throw new exceptions_1.ArgumentInvalidException('Apartment ad required');
        }
        if (!landlord) {
            throw new common_1.NotFoundException('Landlord not found');
        }
        if (!apartmentAd.baseApartmentAdDataForContract) {
            throw new common_1.NotFoundException('Apartment ad address not found');
        }
        if (apartmentAd.rentBookingType !== enums_1.ShortTermRentBookingType.INSTANT) {
            throw new exceptions_1.ArgumentInvalidException(`Rent booking type ${enums_1.ShortTermRentBookingType.INSTANT} not available for this apartment ad`);
        }
        const contract = contract_entity_1.ContractEntity.create({
            apartmentRentPeriodType,
            contractRequestId: contractRequest.id,
            status: enums_1.ContractStatus.CREATED,
            tenantId,
            detailsProps: {
                arrivalDate,
                departureDate,
                rules: apartmentAd === null || apartmentAd === void 0 ? void 0 : apartmentAd.rules,
            },
            apartmentAdId,
            landlordId,
            rentPeriodVersion,
            cancellationPolicyProps: cancellation_policy_value_object_1.CancellationPolicyVO.create(apartmentRentPeriodType, {
                shortTermCancellationPolicy: apartmentAd === null || apartmentAd === void 0 ? void 0 : apartmentAd.shortTermRentCancellationPolicy,
                longTermCancellationPolicy: apartmentAd === null || apartmentAd === void 0 ? void 0 : apartmentAd.longTermRentCancellationPolicy,
            }),
            costAndCurrency: apartmentAd.getCostAndCurrency(apartmentRentPeriodType),
            tenantPaymentMethod: new payment_method_value_object_1.PaymentMethodVO({ innopayCardId: cardId.value, defaultType: enums_1.PaymentMethod.INNOPAY }),
            shortTermRentBookingType: rent_booking_type_value_object_1.ShortTermRentBookingTypeVO.create(enums_1.ShortTermRentBookingType.INSTANT),
            shortTermRentPaymentType,
            baseContractApartmentAdData: new base_contract_apartment_ad_data_value_object_1.BaseContractApartmentAdDataVO({
                title: apartmentAd.baseApartmentAdDataForContract.name,
                address: apartmentAd.baseApartmentAdDataForContract.address,
            }),
            guests,
            isFined: !!(landlord === null || landlord === void 0 ? void 0 : landlord.numberFines),
        });
        await this.contractRepository.save(contract, trxId);
        return contract;
    }
    async createChat(contract, trxId) {
        const tenantId = contract.tenantIdOrFail;
        const landlordId = contract.landlordIdOrFail;
        const chat = chat_entity_1.ChatEntity.create({
            contractId: contract.id,
            members: [
                {
                    memberId: landlordId,
                    role: types_1.UserChatRole.LANDLORD,
                },
                {
                    memberId: tenantId,
                    role: types_1.UserChatRole.TENANT,
                },
            ],
        });
        await this.chatRepository.save(chat, trxId);
        return chat;
    }
    async sendSystemMessage({ chatId, tenantId, comment, contract, trxId, }) {
        const message = message_entity_1.MessageEntity.create({
            chatId,
            senderId: tenantId,
            type: types_3.MessageType.SYSTEM,
            system: {
                type: types_3.SystemMessageType.BOOKING_CREATED,
                contractData: { ...contract.systemMessageData, comment },
            },
        });
        await this.messageRepository.save(message, trxId);
        await this.commandBus.execute(new update_last_message_command_1.UpdateLastMessageCommand(chatId, trxId));
        return message;
    }
    async publishMessage(message, chat) {
        const { members } = chat;
        const mapper = new message_orm_mapper_1.MessageOrmMapper(message_entity_1.MessageEntity);
        const ormMessage = await mapper.toOrmEntity(message);
        await this.pubSubService.publish(pub_sub_service_1.PubSubTrigger.NEW_MESSAGE, {
            message: ormMessage,
            chatMembers: members
                .map((member) => ({ [member.memberId.value]: member.role }))
                .reduce((acc, curr) => Object.assign({}, acc, curr)),
        });
    }
};
CreateInstantContractHandler = __decorate([
    (0, cqrs_1.CommandHandler)(create_instant_booking_contract_command_1.CreateInstantContractCommand),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        chat_repository_1.ChatRepository,
        message_repository_1.MessageRepository,
        apartment_ad_repository_1.ApartmentAdRepository,
        innopay_card_repository_1.InnopayCardRepository,
        user_repository_1.UserRepository,
        pub_sub_service_1.PubSubService,
        cqrs_1.CommandBus])
], CreateInstantContractHandler);
exports.CreateInstantContractHandler = CreateInstantContractHandler;
//# sourceMappingURL=create-instant-booking-contract.handler.js.map