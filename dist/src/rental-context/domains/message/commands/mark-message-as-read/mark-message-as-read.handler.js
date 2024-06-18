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
exports.MarkMessageAsReadHandler = void 0;
const chat_repository_1 = require("../../../../domain-repositories/chat/chat.repository");
const message_repository_1 = require("../../../../domain-repositories/message/message.repository");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const mark_message_as_read_command_1 = require("./mark-message-as-read.command");
let MarkMessageAsReadHandler = class MarkMessageAsReadHandler {
    constructor(chatRepository, messageRepository) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
    }
    async execute(command) {
        const { userId, messageId: incomingMessageId } = command;
        const chat = await this.chatRepository.findOneByMessageAndMemberId(incomingMessageId.value, userId.value);
        if (!chat) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Message not found'));
        }
        const lastReadMessageId = chat.getLastReadMessageId(userId);
        const newestMessage = lastReadMessageId
            ? await this.messageRepository.findLastOfArray([incomingMessageId.value, lastReadMessageId.value])
            : undefined;
        const messageId = newestMessage ? newestMessage.id : incomingMessageId;
        chat.setLastReadMessageId(messageId, userId);
        await this.chatRepository.save(chat);
        return (0, oxide_ts_1.Ok)(true);
    }
};
MarkMessageAsReadHandler = __decorate([
    (0, cqrs_1.CommandHandler)(mark_message_as_read_command_1.MarkMessageAsReadCommand),
    __metadata("design:paramtypes", [chat_repository_1.ChatRepository, message_repository_1.MessageRepository])
], MarkMessageAsReadHandler);
exports.MarkMessageAsReadHandler = MarkMessageAsReadHandler;
//# sourceMappingURL=mark-message-as-read.handler.js.map