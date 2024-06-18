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
exports.UpdateLastOfferMessageHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const chat_repository_1 = require("../../../../domain-repositories/chat/chat.repository");
const message_repository_1 = require("../../../../domain-repositories/message/message.repository");
const update_last_offer_message_command_1 = require("./update-last-offer-message.command");
let UpdateLastOfferMessageHandler = class UpdateLastOfferMessageHandler {
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
        const lastOfferMessage = await this.messageRepository.findLastOfferForChat(chatId.value, trxId);
        chat.setLastOfferMessageId(lastOfferMessage === null || lastOfferMessage === void 0 ? void 0 : lastOfferMessage.id);
        await this.chatRepository.save(chat, trxId);
    }
};
UpdateLastOfferMessageHandler = __decorate([
    (0, cqrs_1.CommandHandler)(update_last_offer_message_command_1.UpdateLastOfferMessageCommand),
    __metadata("design:paramtypes", [message_repository_1.MessageRepository, chat_repository_1.ChatRepository])
], UpdateLastOfferMessageHandler);
exports.UpdateLastOfferMessageHandler = UpdateLastOfferMessageHandler;
//# sourceMappingURL=update-last-offer-message.handler.js.map