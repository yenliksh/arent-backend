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
exports.PushSystemMessageHandler = void 0;
const chat_repository_1 = require("../../../../domain-repositories/chat/chat.repository");
const types_1 = require("../../domain/types");
const unit_of_work_1 = require("../../../../../infrastructure/database/unit-of-work/unit-of-work");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const message_repository_1 = require("../../../../domain-repositories/message/message.repository");
const message_entity_1 = require("../../domain/entities/message.entity");
const push_system_message_command_1 = require("./push-system-message.command");
let PushSystemMessageHandler = class PushSystemMessageHandler {
    constructor(messageRepository, chatRepository, unitOfWork) {
        this.messageRepository = messageRepository;
        this.chatRepository = chatRepository;
        this.unitOfWork = unitOfWork;
    }
    async execute(command) {
        const { trxId: incomingTrxId } = command;
        const { chatId, senderId, content } = command.messageProps;
        const message = message_entity_1.MessageEntity.create({
            chatId,
            senderId,
            type: types_1.MessageType.SYSTEM,
            system: content,
        });
        const [trxId, isOwnTrx] = incomingTrxId ? [incomingTrxId, false] : [await this.unitOfWork.start(), true];
        try {
            const chat = await this.chatRepository.findOneById(chatId.value, trxId);
            if (!chat) {
                return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Chat not found'));
            }
            chat.setLastReadMessageId(message.id, senderId);
            chat.setLastMessageId(message.id);
            if (content.type === types_1.SystemMessageType.OFFER_SENDING) {
                chat.setLastOfferMessageId(message.id);
            }
            await this.messageRepository.save(message, trxId);
            await this.chatRepository.save(chat, trxId);
            if (isOwnTrx) {
                await this.unitOfWork.commit(trxId);
            }
        }
        catch (error) {
            if (isOwnTrx) {
                await this.unitOfWork.rollback(trxId);
            }
            throw error;
        }
        return (0, oxide_ts_1.Ok)(message);
    }
};
PushSystemMessageHandler = __decorate([
    (0, cqrs_1.CommandHandler)(push_system_message_command_1.PushSystemMessageCommand),
    __metadata("design:paramtypes", [message_repository_1.MessageRepository,
        chat_repository_1.ChatRepository,
        unit_of_work_1.UnitOfWork])
], PushSystemMessageHandler);
exports.PushSystemMessageHandler = PushSystemMessageHandler;
//# sourceMappingURL=push-system-message.handler.js.map