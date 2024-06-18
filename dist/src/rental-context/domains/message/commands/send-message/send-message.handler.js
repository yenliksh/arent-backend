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
exports.SendMessageHandler = void 0;
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const update_last_message_command_1 = require("../../../chat/commands/update-last-message/update-last-message.command");
const contract_offer_queue_1 = require("../../../contract/bulls/queue/contract-offer.queue");
const types_1 = require("../../../contract/bulls/types");
const types_2 = require("../../domain/types");
const chat_is_not_active_problem_1 = require("../../problems/chat-is-not-active.problem");
const unit_of_work_1 = require("../../../../../infrastructure/database/unit-of-work/unit-of-work");
const enums_1 = require("../../../../../infrastructure/enums");
const exceptions_1 = require("../../../../../libs/exceptions");
const pub_sub_service_1 = require("../../../../../modules/graphql-subscriptions/pub-sub.service");
const new_message_event_1 = require("../../../../../modules/notifications/services/new-message/new-message.event");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const event_emitter_1 = require("@nestjs/event-emitter");
const oxide_ts_1 = require("oxide.ts");
const chat_repository_1 = require("../../../../domain-repositories/chat/chat.repository");
const message_orm_mapper_1 = require("../../../../domain-repositories/message/message.orm-mapper");
const message_repository_1 = require("../../../../domain-repositories/message/message.repository");
const message_entity_1 = require("../../domain/entities/message.entity");
const send_message_command_1 = require("./send-message.command");
let SendMessageHandler = class SendMessageHandler {
    constructor(messageRepository, chatRepository, contractRepository, pubSubService, contractOfferQueue, commandBus, unitOfWork, eventEmitter) {
        this.messageRepository = messageRepository;
        this.chatRepository = chatRepository;
        this.contractRepository = contractRepository;
        this.pubSubService = pubSubService;
        this.contractOfferQueue = contractOfferQueue;
        this.commandBus = commandBus;
        this.unitOfWork = unitOfWork;
        this.eventEmitter = eventEmitter;
    }
    async execute(command) {
        var _a;
        const { chatId, senderId, type, id, media, system, text } = command.props;
        const trxId = await this.unitOfWork.start();
        try {
            if (id) {
                const foundMessage = await this.messageRepository.findOneById(id.value, trxId);
                if (foundMessage) {
                    await this.unitOfWork.rollback(trxId);
                    return (0, oxide_ts_1.Err)(new common_1.ConflictException('Message with this id already exist'));
                }
            }
            const chat = await this.chatRepository.findByIdAndMemberId(chatId.value, senderId.value, trxId);
            if (!chat) {
                await this.unitOfWork.rollback(trxId);
                return (0, oxide_ts_1.Err)(new common_1.ForbiddenException());
            }
            if (!chat.isActive) {
                await this.unitOfWork.rollback(trxId);
                return (0, oxide_ts_1.Err)(new chat_is_not_active_problem_1.ChatIsNotActiveProblem());
            }
            if (!((_a = chat.members) === null || _a === void 0 ? void 0 : _a.length)) {
                await this.unitOfWork.rollback(trxId);
                return (0, oxide_ts_1.Err)(new exceptions_1.ArgumentInvalidException('Chat member required'));
            }
            const finishRejectFunc = await this.rejectContractOfferIfExist(chatId, senderId, trxId);
            const message = message_entity_1.MessageEntity.create({ chatId: chat.id, senderId, type, id, media, system, text });
            await this.messageRepository.save(message, trxId);
            chat.setLastReadMessageId(message.id, senderId);
            await this.chatRepository.save(chat, trxId);
            try {
                await this.commandBus.execute(new update_last_message_command_1.UpdateLastMessageCommand(chat.id, trxId));
            }
            catch (error) {
                await this.unitOfWork.rollback(trxId);
                return (0, oxide_ts_1.Err)(new common_1.UnprocessableEntityException());
            }
            await this.unitOfWork.execute(trxId);
            finishRejectFunc();
            this.publishMessage(message, chat.members);
            if ([types_2.MessageType.MEDIA, types_2.MessageType.TEXT].includes(type)) {
                this.eventEmitter.emit(new_message_event_1.NewMessageEvent.eventName, new_message_event_1.NewMessageEvent.create({
                    senderId,
                    chatMembers: chat.members,
                    chatId: chat.id,
                }));
            }
            return (0, oxide_ts_1.Ok)(message.id);
        }
        catch (error) {
            await this.unitOfWork.rollback(trxId);
            throw error;
        }
    }
    async rejectContractOfferIfExist(chatId, userId, trxId) {
        const contract = await this.contractRepository.findOneByMemberAndChatId(chatId.value, userId.value, trxId);
        if ((contract === null || contract === void 0 ? void 0 : contract.status.value) !== enums_1.ContractStatus.OFFERING) {
            return () => undefined;
        }
        contract.setPending();
        await this.contractRepository.save(contract, trxId);
        return () => this.contractOfferQueue.addRejectJob({
            chatId: chatId.value,
            userId: userId.value,
            rejectTrigger: types_1.RejectTrigger.SYSTEM,
        });
    }
    async publishMessage(message, members) {
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
SendMessageHandler = __decorate([
    (0, cqrs_1.CommandHandler)(send_message_command_1.SendMessageCommand),
    __metadata("design:paramtypes", [message_repository_1.MessageRepository,
        chat_repository_1.ChatRepository,
        contract_repository_1.ContractRepository,
        pub_sub_service_1.PubSubService,
        contract_offer_queue_1.ContractOfferQueue,
        cqrs_1.CommandBus,
        unit_of_work_1.UnitOfWork,
        event_emitter_1.EventEmitter2])
], SendMessageHandler);
exports.SendMessageHandler = SendMessageHandler;
//# sourceMappingURL=send-message.handler.js.map