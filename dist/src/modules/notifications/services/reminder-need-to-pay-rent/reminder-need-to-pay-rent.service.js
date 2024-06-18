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
exports.ReminderNeedToPayRentService = void 0;
const payment_transaction_entity_1 = require("../../../../rental-context/domains/payment-transaction/domain/entities/payment-transaction.entity");
const types_1 = require("../../../../rental-context/domains/payment-transaction/domain/types");
const payment_transaction_orm_entity_1 = require("../../../../infrastructure/database/entities/payment-transaction.orm-entity");
const date_util_1 = require("../../../../libs/utils/date-util");
const minimal_unit_helper_1 = require("../../../../libs/utils/minimal-unit.helper");
const slash_agnostic_1 = require("../../../../libs/utils/slash-agnostic");
const timezone_util_1 = require("../../../../libs/utils/timezone-util");
const notification_recipients_base_1 = require("../../base/notification-recipients.base");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const simple_email_service_1 = require("../../../../third-parties/simple-email/src/services/simple-email.service");
const reminder_need_to_pay_rent_template_1 = require("./reminder-need-to-pay-rent.template");
let ReminderNeedToPayRentService = class ReminderNeedToPayRentService extends notification_recipients_base_1.BaseNotificationRecipients {
    constructor(simpleEmailService, configService) {
        super(configService);
        this.simpleEmailService = simpleEmailService;
    }
    async handle() {
        const paymentTransactions = await payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query()
            .withGraphFetched({ contract: { tenant: true } }, { joinOperation: 'innerJoin' })
            .where({ status: types_1.PaymentTransactionStatus.CASH_IN_WAITING, isRecurring: true })
            .andWhere('withdrawFundsDate', '<=', `${date_util_1.DateUtil.now().add(payment_transaction_entity_1.PaymentTransactionEntity.EARLY_PAY_DAYS, 'day').toISOString()}`);
        await this.sendEmailNotification(paymentTransactions);
    }
    async sendEmailNotification(paymentTransactions) {
        return Promise.all(paymentTransactions.map((pt) => {
            if (!pt.contract || !pt.contract.tenant) {
                return;
            }
            const filteredEmailRecipient = this.builder(pt.contract.tenant)
                .filterByEmailVerified()
                .filterByEmailParams('reminderNeedToPayRent')
                .getOne();
            if (!filteredEmailRecipient) {
                return;
            }
            const recipientName = `${filteredEmailRecipient.firstName} ${filteredEmailRecipient.lastName}`;
            const recipientEmail = filteredEmailRecipient.email;
            const address = pt.contract.baseApartmentAdData.address;
            const collectedAddress = `${address.street}  ${address.houseNumber},  ${address.city}, ${address.country === 'KZ' ? 'Казахстан' : address.country}`;
            const tz = timezone_util_1.TimezoneUtil.getOffsetByCords({ lat: address.geoPoint.lat, lng: address.geoPoint.lng });
            const destination = {
                ToAddresses: [recipientEmail],
            };
            const message = this.templateMessage({
                recipientName,
                withdrawFundsDate: pt.withdrawFundsDate,
                address: collectedAddress,
                amount: pt.totalAmountPayable,
                tz,
            });
            return this.simpleEmailService.sendEmail({
                source: this.emailFrom,
                destination,
                message,
            });
        }));
    }
    templateMessage({ recipientName, withdrawFundsDate, amount, address, tz, }) {
        const message = {
            Subject: {
                Charset: 'UTF-8',
                Data: '⏰ Пора платить за аренду',
            },
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: (0, reminder_need_to_pay_rent_template_1.reminderNeedToPayRentTemplate)({
                        recipientName,
                        withdrawFundsDate: date_util_1.DateUtil.parseWithZone(withdrawFundsDate, tz).format('DD.MM.YYYY HH:mm:ss'),
                        paymentAmount: (0, minimal_unit_helper_1.toMinorUnit)(amount),
                        address,
                        currency: '₸',
                        buttonLink: (0, slash_agnostic_1.slashAgnostic)(this.frontendUrl, `my-profile?activeTab=PAYMENTS`),
                    }),
                },
            },
        };
        return message;
    }
};
ReminderNeedToPayRentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [simple_email_service_1.SimpleEmailService, config_1.ConfigService])
], ReminderNeedToPayRentService);
exports.ReminderNeedToPayRentService = ReminderNeedToPayRentService;
//# sourceMappingURL=reminder-need-to-pay-rent.service.js.map