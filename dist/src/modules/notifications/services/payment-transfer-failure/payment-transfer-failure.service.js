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
exports.PaymentTransferFailureService = void 0;
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const slash_agnostic_1 = require("../../../../libs/utils/slash-agnostic");
const notification_recipients_base_1 = require("../../base/notification-recipients.base");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const simple_email_service_1 = require("../../../../third-parties/simple-email/src/services/simple-email.service");
const payment_transfer_failure_template_1 = require("./payment-transfer-failure.template");
let PaymentTransferFailureService = class PaymentTransferFailureService extends notification_recipients_base_1.BaseNotificationRecipients {
    constructor(simpleEmailService, configService) {
        super(configService);
        this.simpleEmailService = simpleEmailService;
    }
    async handle({ recipientId }) {
        const recipient = await user_orm_entity_1.UserOrmEntity.query().findById(recipientId.value);
        if (!recipient) {
            return;
        }
        const filteredEmailRecipients = this.builder(recipient)
            .filterByEmailVerified()
            .filterByEmailParams('transferFailure')
            .get();
        await this.sendEmailNotification(filteredEmailRecipients);
    }
    async sendEmailNotification(recipients) {
        return Promise.all(recipients.map((recipient) => {
            const recipientName = `${recipient.firstName} ${recipient.lastName}`;
            const recipientEmail = recipient.email;
            const destination = {
                ToAddresses: [recipientEmail],
            };
            const message = this.templateMessage(recipientName);
            return this.simpleEmailService.sendEmail({
                source: this.emailFrom,
                destination,
                message,
            });
        }));
    }
    templateMessage(recipientName) {
        const message = {
            Subject: {
                Charset: 'UTF-8',
                Data: '❌ Ошибка платежа',
            },
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: (0, payment_transfer_failure_template_1.paymentTransferFailureTemplate)({
                        recipientName,
                        buttonLink: (0, slash_agnostic_1.slashAgnostic)(this.frontendUrl, `my-profile?activeTab=PAYMENTS`),
                    }),
                },
            },
        };
        return message;
    }
};
PaymentTransferFailureService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [simple_email_service_1.SimpleEmailService, config_1.ConfigService])
], PaymentTransferFailureService);
exports.PaymentTransferFailureService = PaymentTransferFailureService;
//# sourceMappingURL=payment-transfer-failure.service.js.map