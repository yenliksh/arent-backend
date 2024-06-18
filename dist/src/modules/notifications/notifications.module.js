"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const ses_factory_1 = require("../../infrastructure/configs/ses.factory");
const sns_factory_1 = require("../../infrastructure/configs/sns.factory");
const common_1 = require("@nestjs/common");
const simple_email_module_1 = require("../../third-parties/simple-email/src/simple-email.module");
const src_1 = require("../../third-parties/simple-notification/src");
const webhook_reminder_controller_1 = require("./controllers/webhook-reminder.controller");
const notifications_listener_1 = require("./notifications.listener");
const apartment_ad_approved_service_1 = require("./services/apartment-ad-approved/apartment-ad-approved.service");
const apartment_ad_rejected_service_1 = require("./services/apartment-ad-rejected/apartment-ad-rejected.service");
const booking_request_sent_service_1 = require("./services/booking-request-sent/booking-request-sent.service");
const booking_request_status_changed_service_1 = require("./services/booking-request-status-changed/booking-request-status-changed.service");
const contract_concluded_service_1 = require("./services/contract-concluded/contract-concluded.service");
const contract_offer_sent_service_1 = require("./services/contract-offer-sent/contract-offer-sent.service");
const contract_offer_status_changed_service_1 = require("./services/contract-offer-status-changed/contract-offer-status-changed.service");
const new_message_service_1 = require("./services/new-message/new-message.service");
const payment_transfer_failure_service_1 = require("./services/payment-transfer-failure/payment-transfer-failure.service");
const payment_transfer_success_service_1 = require("./services/payment-transfer-success/payment-transfer-success.service");
const recurring_payment_last_withdraw_failure_service_1 = require("./services/recurring-payment-last-withdraw-failure/recurring-payment-last-withdraw-failure.service");
const recurring_payment_withdraw_failure_service_1 = require("./services/recurring-payment-withdraw-failure/recurring-payment-withdraw-failure.service");
const recurring_payment_withdraw_success_service_1 = require("./services/recurring-payment-withdraw-success/recurring-payment-withdraw-success.service");
const reminder_need_to_pay_rent_service_1 = require("./services/reminder-need-to-pay-rent/reminder-need-to-pay-rent.service");
const require_identity_document_service_1 = require("./services/require-identity-document/require-identity-document.service");
const verification_email_service_1 = require("./services/verification-email/verification-email.service");
const thirdPartyServices = [
    src_1.SimpleNotificationModule.forRootAsync(sns_factory_1.snsFactory),
    simple_email_module_1.SimpleEmailModule.forRootAsync(ses_factory_1.sesFactory),
];
const notificationServices = [
    new_message_service_1.NewMessageService,
    verification_email_service_1.VerificationEmailService,
    require_identity_document_service_1.RequireIdentityDocumentService,
    contract_concluded_service_1.ContractConcludedService,
    recurring_payment_withdraw_success_service_1.RecurringPaymentWithdrawSuccessService,
    recurring_payment_withdraw_failure_service_1.RecurringPaymentWithdrawFailureService,
    payment_transfer_success_service_1.PaymentTransferSuccessService,
    payment_transfer_failure_service_1.PaymentTransferFailureService,
    reminder_need_to_pay_rent_service_1.ReminderNeedToPayRentService,
    recurring_payment_last_withdraw_failure_service_1.RecurringPaymentLastWithdrawFailureService,
    booking_request_sent_service_1.BookingRequestSentService,
    booking_request_status_changed_service_1.BookingRequestStatusChangedService,
    apartment_ad_approved_service_1.ApartmentAdApprovedService,
    apartment_ad_rejected_service_1.ApartmentAdRejectService,
    contract_offer_status_changed_service_1.ContractOfferStatusChangedService,
    contract_offer_sent_service_1.ContractOfferSentService,
];
let NotificationsModule = class NotificationsModule {
};
NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [...thirdPartyServices],
        controllers: [webhook_reminder_controller_1.WebhookReminderController],
        providers: [notifications_listener_1.NotificationListener, ...notificationServices],
    })
], NotificationsModule);
exports.NotificationsModule = NotificationsModule;
//# sourceMappingURL=notifications.module.js.map