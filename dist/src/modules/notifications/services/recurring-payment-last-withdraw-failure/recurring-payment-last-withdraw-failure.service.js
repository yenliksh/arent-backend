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
exports.RecurringPaymentLastWithdrawFailureService = void 0;
const chat_orm_entity_1 = require("../../../../infrastructure/database/entities/chat.orm-entity");
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const slash_agnostic_1 = require("../../../../libs/utils/slash-agnostic");
const notification_recipients_base_1 = require("../../base/notification-recipients.base");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const simple_email_service_1 = require("../../../../third-parties/simple-email/src/services/simple-email.service");
const recurring_payment_last_withdraw_failure_template_1 = require("./recurring-payment-last-withdraw-failure.template");
let RecurringPaymentLastWithdrawFailureService = class RecurringPaymentLastWithdrawFailureService extends notification_recipients_base_1.BaseNotificationRecipients {
    constructor(simpleEmailService, configService) {
        super(configService);
        this.simpleEmailService = simpleEmailService;
    }
    async handle({ recipientId, contractId }) {
        const [recipient, chat] = await Promise.all([
            user_orm_entity_1.UserOrmEntity.query().findById(recipientId.value),
            chat_orm_entity_1.ChatOrmEntity.query().findOne({ contractId: contractId.value }).select('id'),
        ]);
        if (!recipient || !chat) {
            return;
        }
        const filteredEmailRecipients = this.builder(recipient)
            .filterByEmailVerified()
            .filterByEmailParams('recurringPaymentSuccess')
            .get();
        await this.sendEmailNotification({ recipients: filteredEmailRecipients, chatId: chat.id });
    }
    async sendEmailNotification({ recipients, chatId }) {
        return Promise.all(recipients.map((recipient) => {
            const recipientName = `${recipient.firstName} ${recipient.lastName}`;
            const recipientEmail = recipient.email;
            const destination = {
                ToAddresses: [recipientEmail],
            };
            const message = this.templateMessage(recipientName, chatId);
            return this.simpleEmailService.sendEmail({
                source: this.emailFrom,
                destination,
                message,
            });
        }));
    }
    templateMessage(recipientName, chatId) {
        const message = {
            Subject: {
                Charset: 'UTF-8',
                Data: '❌ Ошибка платежа',
            },
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: (0, recurring_payment_last_withdraw_failure_template_1.recurringPaymentLastWithdrawFailureTemplate)({
                        recipientName,
                        buttonLink: (0, slash_agnostic_1.slashAgnostic)(this.frontendUrl, `chat?chatId=${chatId}`),
                    }),
                },
            },
        };
        return message;
    }
};
RecurringPaymentLastWithdrawFailureService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [simple_email_service_1.SimpleEmailService, config_1.ConfigService])
], RecurringPaymentLastWithdrawFailureService);
exports.RecurringPaymentLastWithdrawFailureService = RecurringPaymentLastWithdrawFailureService;
//# sourceMappingURL=recurring-payment-last-withdraw-failure.service.js.map