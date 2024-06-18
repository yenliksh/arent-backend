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
exports.UpdateLastMessageHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const chat_repository_1 = require("../../../../domain-repositories/chat/chat.repository");
const message_repository_1 = require("../../../../domain-repositories/message/message.repository");
const update_last_message_command_1 = require("./update-last-message.command");
let UpdateLastMessageHandler = class UpdateLastMessageHandler {
    constructor(messageRepository, chatRepository) {
        this.messageRepository = messageRepository;
        this.chatRepository = chatRepository;
    }
    async execute(command) {
        const { chatId, trxId } = command;
        const chat = await this.chatRepository.findOneById(chatId.value, trxId);
        if (!chat) {
            throw new common_1.NotFoundException();
        }
        const lastMessage = await this.messageRepository.findLastForChat(chatId.value, trxId);
        chat.setLastMessageId(lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.id);
        await this.chatRepository.save(chat, trxId);
    }
};
UpdateLastMessageHandler = __decorate([
    (0, cqrs_1.CommandHandler)(update_last_message_command_1.UpdateLastMessageCommand),
    __metadata("design:paramtypes", [message_repository_1.MessageRepository, chat_repository_1.ChatRepository])
], UpdateLastMessageHandler);
exports.UpdateLastMessageHandler = UpdateLastMessageHandler;
//# sourceMappingURL=update-last-message.handler.js.map