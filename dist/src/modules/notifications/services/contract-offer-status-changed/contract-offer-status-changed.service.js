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
exports.ContractOfferStatusChangedService = void 0;
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const slash_agnostic_1 = require("../../../../libs/utils/slash-agnostic");
const notification_recipients_base_1 = require("../../base/notification-recipients.base");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const oxide_ts_1 = require("oxide.ts");
const simple_email_service_1 = require("../../../../third-parties/simple-email/src/services/simple-email.service");
const contract_offer_status_changed_template_1 = require("./contract-offer-status-changed.template");
let ContractOfferStatusChangedService = class ContractOfferStatusChangedService extends notification_recipients_base_1.BaseNotificationRecipients {
    constructor(simpleEmailService, configService) {
        super(configService);
        this.simpleEmailService = simpleEmailService;
    }
    async handle({ recipientId, isLandLord }) {
        const recipient = await user_orm_entity_1.UserOrmEntity.query().findById(recipientId.value);
        if (!recipient) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Recipent not found!'));
        }
        const filteredEmailRecipients = this.builder(recipient)
            .filterByEmailVerified()
            .filterByEmailParams('adRejected')
            .get();
        await this.sendEmailNotification(filteredEmailRecipients, isLandLord);
        return (0, oxide_ts_1.Ok)('OK');
    }
    async sendEmailNotification(recipients, isLandLord) {
        return Promise.all(recipients.map((recipient) => {
            const recipientName = `${recipient.firstName} ${recipient.lastName}`;
            const recipientEmail = recipient.email;
            const destination = {
                ToAddresses: [recipientEmail],
            };
            const message = this.templateMessage(recipientName, !!isLandLord);
            return this.simpleEmailService.sendEmail({
                source: this.emailFrom,
                destination,
                message,
            });
        }));
    }
    templateMessage(recipientName, isLandLord) {
        const message = {
            Subject: {
                Charset: 'UTF-8',
                Data: isLandLord ? '📩 Запрос по бронированию жилья изменен!' : '📩 Запрос по аренде жилья изменен!',
            },
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: (0, contract_offer_status_changed_template_1.contractOfferStatusChangedTemplate)({
                        recipientName,
                        buttonLink: (0, slash_agnostic_1.slashAgnostic)(this.frontendUrl, isLandLord ? 'chat' : 'dashboard?activeTab=CHAT'),
                        isLandLord,
                    }),
                },
            },
        };
        return message;
    }
};
ContractOfferStatusChangedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [simple_email_service_1.SimpleEmailService, config_1.ConfigService])
], ContractOfferStatusChangedService);
exports.ContractOfferStatusChangedService = ContractOfferStatusChangedService;
//# sourceMappingURL=contract-offer-status-changed.service.js.map