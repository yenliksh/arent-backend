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
exports.NotificationListener = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const apartment_ad_approved_event_1 = require("./services/apartment-ad-approved/apartment-ad-approved.event");
const apartment_ad_approved_service_1 = require("./services/apartment-ad-approved/apartment-ad-approved.service");
const apartment_ad_rejected_event_1 = require("./services/apartment-ad-rejected/apartment-ad-rejected.event");
const apartment_ad_rejected_service_1 = require("./services/apartment-ad-rejected/apartment-ad-rejected.service");
const booking_request_sent_event_1 = require("./services/booking-request-sent/booking-request-sent.event");
const booking_request_sent_service_1 = require("./services/booking-request-sent/booking-request-sent.service");
const booking_request_status_changed_event_1 = require("./services/booking-request-status-changed/booking-request-status-changed.event");
const booking_request_status_changed_service_1 = require("./services/booking-request-status-changed/booking-request-status-changed.service");
const contract_concluded_event_1 = require("./services/contract-concluded/contract-concluded.event");
const contract_concluded_service_1 = require("./services/contract-concluded/contract-concluded.service");
const contract_offer_sent_event_1 = require("./services/contract-offer-sent/contract-offer-sent.event");
const contract_offer_sent_service_1 = require("./services/contract-offer-sent/contract-offer-sent.service");
const contract_offer_status_changed_event_1 = require("./services/contract-offer-status-changed/contract-offer-status-changed.event");
const contract_offer_status_changed_service_1 = require("./services/contract-offer-status-changed/contract-offer-status-changed.service");
const new_message_event_1 = require("./services/new-message/new-message.event");
const new_message_service_1 = require("./services/new-message/new-message.service");
const payment_transfer_failure_event_1 = require("./services/payment-transfer-failure/payment-transfer-failure.event");
const payment_transfer_failure_service_1 = require("./services/payment-transfer-failure/payment-transfer-failure.service");
const payment_transfer_success_event_1 = require("./services/payment-transfer-success/payment-transfer-success.event");
const payment_transfer_success_service_1 = require("./services/payment-transfer-success/payment-transfer-success.service");
const recurring_payment_last_withdraw_failure_event_1 = require("./services/recurring-payment-last-withdraw-failure/recurring-payment-last-withdraw-failure.event");
const recurring_payment_last_withdraw_failure_service_1 = require("./services/recurring-payment-last-withdraw-failure/recurring-payment-last-withdraw-failure.service");
const recurring_payment_withdraw_failure_event_1 = require("./services/recurring-payment-withdraw-failure/recurring-payment-withdraw-failure.event");
const recurring_payment_withdraw_failure_service_1 = require("./services/recurring-payment-withdraw-failure/recurring-payment-withdraw-failure.service");
const recurring_payment_withdraw_success_event_1 = require("./services/recurring-payment-withdraw-success/recurring-payment-withdraw-success.event");
const recurring_payment_withdraw_success_service_1 = require("./services/recurring-payment-withdraw-success/recurring-payment-withdraw-success.service");
const require_identity_document_event_1 = require("./services/require-identity-document/require-identity-document.event");
const require_identity_document_service_1 = require("./services/require-identity-document/require-identity-document.service");
const verification_email_event_1 = require("./services/verification-email/verification-email.event");
const verification_email_service_1 = require("./services/verification-email/verification-email.service");
let NotificationListener = class NotificationListener {
    constructor(configService, newMessageService, verificationEmailService, requireIdentityDocumentService, contractConcludedService, recurringPaymentWithdrawSuccessService, recurringPaymentWithdrawFailureService, paymentTransferSuccessService, paymentTransferFailureService, recurringPaymentLastWithdrawFailureService, bookingRequestSentService, bookingRequestStatusChangedService, apartmentAdApprovedService, apartmentAdRejectService, contractOfferStatudChangedService, contractOfferSentService) {
        this.configService = configService;
        this.newMessageService = newMessageService;
        this.verificationEmailService = verificationEmailService;
        this.requireIdentityDocumentService = requireIdentityDocumentService;
        this.contractConcludedService = contractConcludedService;
        this.recurringPaymentWithdrawSuccessService = recurringPaymentWithdrawSuccessService;
        this.recurringPaymentWithdrawFailureService = recurringPaymentWithdrawFailureService;
        this.paymentTransferSuccessService = paymentTransferSuccessService;
        this.paymentTransferFailureService = paymentTransferFailureService;
        this.recurringPaymentLastWithdrawFailureService = recurringPaymentLastWithdrawFailureService;
        this.bookingRequestSentService = bookingRequestSentService;
        this.bookingRequestStatusChangedService = bookingRequestStatusChangedService;
        this.apartmentAdApprovedService = apartmentAdApprovedService;
        this.apartmentAdRejectService = apartmentAdRejectService;
        this.contractOfferStatudChangedService = contractOfferStatudChangedService;
        this.contractOfferSentService = contractOfferSentService;
        this.isDevelopment = this.configService.get('nodeEnv') === 'development';
    }
    async newMessage(payload) {
        if (this.isDevelopment) {
            return;
        }
        this.newMessageService.handle(payload);
    }
    async verificationEmail(payload) {
        if (this.isDevelopment) {
            return;
        }
        this.verificationEmailService.handle(payload);
    }
    async requireIdentityDocument(payload) {
        if (this.isDevelopment) {
            return;
        }
        this.requireIdentityDocumentService.handle(payload);
    }
    async contractConcluded(payload) {
        if (this.isDevelopment) {
            return;
        }
        this.contractConcludedService.handle(payload);
    }
    async recurringPaymentWithdrawSuccess(payload) {
        if (this.isDevelopment) {
            return;
        }
        this.recurringPaymentWithdrawSuccessService.handle(payload);
    }
    async recurringPaymentWithdrawFailure(payload) {
        if (this.isDevelopment) {
            return;
        }
        this.recurringPaymentWithdrawFailureService.handle(payload);
    }
    async recurringPaymentTransferSuccess(payload) {
        if (this.isDevelopment) {
            return;
        }
        this.paymentTransferSuccessService.handle(payload);
    }
    async recurringPaymentTransferFailure(payload) {
        if (this.isDevelopment) {
            return;
        }
        this.paymentTransferFailureService.handle(payload);
    }
    async recurringPaymentLastWithdrawFailure(payload) {
        if (this.isDevelopment) {
            return;
        }
        this.recurringPaymentLastWithdrawFailureService.handle(payload);
    }
    async bookingRequestSent(payload) {
        if (this.isDevelopment) {
            return;
        }
        this.bookingRequestSentService.handle(payload);
    }
    async contractOfferSent(payload) {
        if (this.isDevelopment) {
            return;
        }
        this.contractOfferSentService.handle(payload);
    }
    async apartmentAdApproved(payload) {
        if (this.isDevelopment) {
            return;
        }
        this.apartmentAdApprovedService.handle(payload);
    }
    async apartmentAdRejected(payload) {
        if (this.isDevelopment) {
            return;
        }
        this.apartmentAdRejectService.handle(payload);
    }
    async contractOfferStatusSent(payload) {
        if (this.isDevelopment) {
            return;
        }
        this.contractOfferStatudChangedService.handle(payload);
    }
    async bookingRequestStatusChanged(payload) {
        if (this.isDevelopment) {
            return;
        }
        this.bookingRequestStatusChangedService.handle(payload);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(new_message_event_1.NewMessageEvent.eventName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_message_event_1.NewMessageEvent]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "newMessage", null);
__decorate([
    (0, event_emitter_1.OnEvent)(verification_email_event_1.VerificationEmailEvent.eventName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verification_email_event_1.VerificationEmailEvent]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "verificationEmail", null);
__decorate([
    (0, event_emitter_1.OnEvent)(require_identity_document_event_1.RequireIdentityDocumentEvent.eventName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [require_identity_document_event_1.RequireIdentityDocumentEvent]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "requireIdentityDocument", null);
__decorate([
    (0, event_emitter_1.OnEvent)(contract_concluded_event_1.ContractConcludedEvent.eventName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_concluded_event_1.ContractConcludedEvent]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "contractConcluded", null);
__decorate([
    (0, event_emitter_1.OnEvent)(recurring_payment_withdraw_success_event_1.RecurringPaymentWithdrawSuccessEvent.eventName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recurring_payment_withdraw_success_event_1.RecurringPaymentWithdrawSuccessEvent]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "recurringPaymentWithdrawSuccess", null);
__decorate([
    (0, event_emitter_1.OnEvent)(recurring_payment_withdraw_failure_event_1.RecurringPaymentWithdrawFailureEvent.eventName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recurring_payment_withdraw_failure_event_1.RecurringPaymentWithdrawFailureEvent]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "recurringPaymentWithdrawFailure", null);
__decorate([
    (0, event_emitter_1.OnEvent)(payment_transfer_success_event_1.PaymentTransferSuccessEvent.eventName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_transfer_success_event_1.PaymentTransferSuccessEvent]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "recurringPaymentTransferSuccess", null);
__decorate([
    (0, event_emitter_1.OnEvent)(payment_transfer_failure_event_1.PaymentTransferFailureEvent.eventName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_transfer_failure_event_1.PaymentTransferFailureEvent]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "recurringPaymentTransferFailure", null);
__decorate([
    (0, event_emitter_1.OnEvent)(recurring_payment_last_withdraw_failure_event_1.RecurringPaymentLastWithdrawFailureEvent.eventName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recurring_payment_last_withdraw_failure_event_1.RecurringPaymentLastWithdrawFailureEvent]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "recurringPaymentLastWithdrawFailure", null);
__decorate([
    (0, event_emitter_1.OnEvent)(booking_request_sent_event_1.BookingRequestSentEvent.eventName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_request_sent_event_1.BookingRequestSentEvent]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "bookingRequestSent", null);
__decorate([
    (0, event_emitter_1.OnEvent)(contract_offer_sent_event_1.ContractOfferSentEvent.eventName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_offer_sent_event_1.ContractOfferSentEvent]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "contractOfferSent", null);
__decorate([
    (0, event_emitter_1.OnEvent)(apartment_ad_approved_event_1.ApartmentAdApprovedEvent.eventName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apartment_ad_approved_event_1.ApartmentAdApprovedEvent]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "apartmentAdApproved", null);
__decorate([
    (0, event_emitter_1.OnEvent)(apartment_ad_rejected_event_1.ApartmentAdRejectedEvent.eventName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apartment_ad_rejected_event_1.ApartmentAdRejectedEvent]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "apartmentAdRejected", null);
__decorate([
    (0, event_emitter_1.OnEvent)(contract_offer_status_changed_event_1.ContractOfferStatusChangedEvent.eventName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_offer_status_changed_event_1.ContractOfferStatusChangedEvent]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "contractOfferStatusSent", null);
__decorate([
    (0, event_emitter_1.OnEvent)(booking_request_status_changed_event_1.BookingRequestStatusChangedEvent.eventName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_request_status_changed_event_1.BookingRequestStatusChangedEvent]),
    __metadata("design:returntype", Promise)
], NotificationListener.prototype, "bookingRequestStatusChanged", null);
NotificationListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        new_message_service_1.NewMessageService,
        verification_email_service_1.VerificationEmailService,
        require_identity_document_service_1.RequireIdentityDocumentService,
        contract_concluded_service_1.ContractConcludedService,
        recurring_payment_withdraw_success_service_1.RecurringPaymentWithdrawSuccessService,
        recurring_payment_withdraw_failure_service_1.RecurringPaymentWithdrawFailureService,
        payment_transfer_success_service_1.PaymentTransferSuccessService,
        payment_transfer_failure_service_1.PaymentTransferFailureService,
        recurring_payment_last_withdraw_failure_service_1.RecurringPaymentLastWithdrawFailureService,
        booking_request_sent_service_1.BookingRequestSentService,
        booking_request_status_changed_service_1.BookingRequestStatusChangedService,
        apartment_ad_approved_service_1.ApartmentAdApprovedService,
        apartment_ad_rejected_service_1.ApartmentAdRejectService,
        contract_offer_status_changed_service_1.ContractOfferStatusChangedService,
        contract_offer_sent_service_1.ContractOfferSentService])
], NotificationListener);
exports.NotificationListener = NotificationListener;
//# sourceMappingURL=notifications.listener.js.map