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
exports.RequireIdentityDocumentService = void 0;
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const slash_agnostic_1 = require("../../../../libs/utils/slash-agnostic");
const notification_recipients_base_1 = require("../../base/notification-recipients.base");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const simple_email_service_1 = require("../../../../third-parties/simple-email/src/services/simple-email.service");
const require_identity_document_template_1 = require("./require-identity-document.template");
let RequireIdentityDocumentService = class RequireIdentityDocumentService extends notification_recipients_base_1.BaseNotificationRecipients {
    constructor(simpleEmailService, configService) {
        super(configService);
        this.simpleEmailService = simpleEmailService;
    }
    async handle({ recipientId }) {
        const recipient = await this.getRecipient(recipientId);
        await this.sendEmailNotification(recipient);
    }
    async getRecipient(recipientId) {
        const recipient = await user_orm_entity_1.UserOrmEntity.query().findById(recipientId.value);
        if (!recipient) {
            throw new common_1.UnprocessableEntityException('For send emails sender not found');
        }
        return recipient;
    }
    async sendEmailNotification(recipient) {
        const recipientName = `${recipient.firstName} ${recipient.lastName}`;
        const destination = {
            ToAddresses: [recipient.email],
        };
        const message = {
            Subject: {
                Charset: 'UTF-8',
                Data: '⬆️ Загрузите удостоверение личности',
            },
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: (0, require_identity_document_template_1.requireIdentityDocumentTemplate)({
                        recipientName,
                        buttonLink: (0, slash_agnostic_1.slashAgnostic)(this.frontendUrl, `my-profile?activeTab=SECURITY`),
                    }),
                },
            },
        };
        await this.simpleEmailService.sendEmail({
            source: this.emailFrom,
            destination,
            message,
        });
    }
};
RequireIdentityDocumentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [simple_email_service_1.SimpleEmailService, config_1.ConfigService])
], RequireIdentityDocumentService);
exports.RequireIdentityDocumentService = RequireIdentityDocumentService;
//# sourceMappingURL=require-identity-document.service.js.map