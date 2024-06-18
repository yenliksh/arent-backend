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
exports.NewMessageService = void 0;
const types_1 = require("../../../../rental-context/domains/chat/domain/types");
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const slash_agnostic_1 = require("../../../../libs/utils/slash-agnostic");
const notification_recipients_base_1 = require("../../base/notification-recipients.base");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const src_1 = require("../../../../third-parties/simple-email/src");
const new_message_template_1 = require("./new-message.template");
let NewMessageService = class NewMessageService extends notification_recipients_base_1.BaseNotificationRecipients {
    constructor(simpleEmailService, configService) {
        super(configService);
        this.simpleEmailService = simpleEmailService;
    }
    async handle({ senderId, chatMembers, chatId }) {
        const { recipients, sender } = await this.getRecipientsAndSender(senderId, chatMembers);
        await this.sendEmailNotification(recipients, sender, chatId);
    }
    async getRecipientsAndSender(senderId, chatMembers) {
        const usersFromChat = await user_orm_entity_1.UserOrmEntity.query().findByIds(chatMembers.map((r) => r.memberId.value));
        const usersWithRole = this.setUserRole(usersFromChat, {
            tenantIds: chatMembers.filter((i) => i.role === types_1.UserChatRole.TENANT).map((i) => i.memberId.value),
            landlordIds: chatMembers.filter((i) => i.role === types_1.UserChatRole.LANDLORD).map((i) => i.memberId.value),
        });
        const sender = usersWithRole.find((u) => u.id === senderId.value);
        const recipients = this.builder(usersWithRole.filter((u) => u.id !== senderId.value))
            .filterByEmailVerified()
            .filterByEmailParams('newMessages')
            .get();
        if (!sender) {
            throw new common_1.UnprocessableEntityException('For send emails the sender is required');
        }
        return {
            sender,
            recipients,
        };
    }
    async sendEmailNotification(recipients, sender, chatId) {
        const senderName = `${sender.firstName} ${sender.lastName}`;
        const emailRequests = recipients.map((recipient) => {
            const recipientName = `${recipient.firstName} ${recipient.lastName}`;
            const destination = {
                ToAddresses: [recipient.email],
            };
            const senderRole = sender.role === types_1.UserChatRole.TENANT ? 'арендатора' : 'арендодателя';
            const senderChatLink = sender.role === types_1.UserChatRole.TENANT
                ? `dashboard?activeTab=CHAT&chatId=${chatId.value}`
                : `chat?chatId=${chatId.value}`;
            const message = {
                Subject: {
                    Charset: 'UTF-8',
                    Data: `📝 Сообщение от ${senderRole}`,
                },
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: (0, new_message_template_1.newMessageTemplate)({
                            recipientName,
                            senderName,
                            buttonLink: (0, slash_agnostic_1.slashAgnostic)(this.frontendUrl, senderChatLink),
                        }),
                    },
                },
            };
            return [destination, message];
        });
        await Promise.all(emailRequests.map(([destination, message]) => this.simpleEmailService.sendEmail({
            source: this.emailFrom,
            destination,
            message,
        })));
    }
};
NewMessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [src_1.SimpleEmailService, config_1.ConfigService])
], NewMessageService);
exports.NewMessageService = NewMessageService;
//# sourceMappingURL=new-message.service.js.map