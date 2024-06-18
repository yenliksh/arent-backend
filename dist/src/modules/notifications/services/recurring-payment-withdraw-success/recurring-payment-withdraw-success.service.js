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
exports.RecurringPaymentWithdrawSuccessService = void 0;
const contract_orm_entity_1 = require("../../../../infrastructure/database/entities/contract.orm-entity");
const payment_transaction_orm_entity_1 = require("../../../../infrastructure/database/entities/payment-transaction.orm-entity");
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const date_util_1 = require("../../../../libs/utils/date-util");
const minimal_unit_helper_1 = require("../../../../libs/utils/minimal-unit.helper");
const slash_agnostic_1 = require("../../../../libs/utils/slash-agnostic");
const timezone_util_1 = require("../../../../libs/utils/timezone-util");
const notification_recipients_base_1 = require("../../base/notification-recipients.base");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const simple_email_service_1 = require("../../../../third-parties/simple-email/src/services/simple-email.service");
const recurring_payment_withdraw_success_template_1 = require("./recurring-payment-withdraw-success.template");
let RecurringPaymentWithdrawSuccessService = class RecurringPaymentWithdrawSuccessService extends notification_recipients_base_1.BaseNotificationRecipients {
    constructor(simpleEmailService, configService) {
        super(configService);
        this.simpleEmailService = simpleEmailService;
    }
    async handle({ recipientId, contractId, paymentTransactionId }) {
        const recipientQuery = user_orm_entity_1.UserOrmEntity.query().findById(recipientId.value);
        const paymentTransactionQuery = payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query().findById(paymentTransactionId.value);
        const contractQuery = contract_orm_entity_1.ContractOrmEntity.query().findById(contractId.value);
        const [recipient, contract, paymentTransaction] = await Promise.all([
            recipientQuery,
            contractQuery,
            paymentTransactionQuery,
        ]);
        if (!recipient || !contract || !paymentTransaction || (contract === null || contract === void 0 ? void 0 : contract.id) !== (paymentTransaction === null || paymentTransaction === void 0 ? void 0 : paymentTransaction.contractId)) {
            return;
        }
        const filteredEmailRecipients = this.builder(recipient)
            .filterByEmailVerified()
            .filterByEmailParams('recurringPaymentSuccess')
            .get();
        await this.sendEmailNotification({
            recipients: filteredEmailRecipients,
            contract,
            transaction: paymentTransaction,
        });
    }
    async sendEmailNotification({ recipients, contract, transaction, }) {
        return Promise.all(recipients.map((recipient) => {
            const recipientName = `${recipient.firstName} ${recipient.lastName}`;
            const recipientEmail = recipient.email;
            const destination = {
                ToAddresses: [recipientEmail],
            };
            const message = this.templateMessage({ recipientName, contract, transaction });
            return this.simpleEmailService.sendEmail({
                source: this.emailFrom,
                destination,
                message,
            });
        }));
    }
    templateMessage({ recipientName, contract, transaction, }) {
        const { address } = contract.baseApartmentAdData;
        const collectedAddress = `${address.street}  ${address.houseNumber},  ${address.city}, ${address.country === 'KZ' ? 'Казахстан' : address.country}`;
        const tz = timezone_util_1.TimezoneUtil.getOffsetByCords({ lat: address.geoPoint.lat, lng: address.geoPoint.lng });
        const message = {
            Subject: {
                Charset: 'UTF-8',
                Data: '✔️ Чек об оплате',
            },
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: (0, recurring_payment_withdraw_success_template_1.recurringPaymentWithdrawSuccessTemplate)({
                        withdrawFundsDate: date_util_1.DateUtil.parseWithZone(transaction.withdrawFundsDate, tz).format('DD.MM.YYYY HH:mm:ss'),
                        paymentAmount: (0, minimal_unit_helper_1.toMinorUnitString)(transaction.totalAmountPayable),
                        address: collectedAddress,
                        startDate: date_util_1.DateUtil.parseWithZone(transaction.startDate, tz).format('DD.MM.YYYY HH:mm:ss'),
                        endDate: date_util_1.DateUtil.parseWithZone(transaction.endDate, tz).format('DD.MM.YYYY HH:mm:ss'),
                        recipientName,
                        buttonLink: (0, slash_agnostic_1.slashAgnostic)(this.frontendUrl, `my-profile?activeTab=PAYMENTS`),
                    }),
                },
            },
        };
        return message;
    }
};
RecurringPaymentWithdrawSuccessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [simple_email_service_1.SimpleEmailService, config_1.ConfigService])
], RecurringPaymentWithdrawSuccessService);
exports.RecurringPaymentWithdrawSuccessService = RecurringPaymentWithdrawSuccessService;
//# sourceMappingURL=recurring-payment-withdraw-success.service.js.map