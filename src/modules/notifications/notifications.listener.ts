import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';

import { ApartmentAdApprovedEvent } from './services/apartment-ad-approved/apartment-ad-approved.event';
import { ApartmentAdApprovedService } from './services/apartment-ad-approved/apartment-ad-approved.service';
import { ApartmentAdRejectedEvent } from './services/apartment-ad-rejected/apartment-ad-rejected.event';
import { ApartmentAdRejectService } from './services/apartment-ad-rejected/apartment-ad-rejected.service';
import { BookingRequestSentEvent } from './services/booking-request-sent/booking-request-sent.event';
import { BookingRequestSentService } from './services/booking-request-sent/booking-request-sent.service';
import { BookingRequestStatusChangedEvent } from './services/booking-request-status-changed/booking-request-status-changed.event';
import { BookingRequestStatusChangedService } from './services/booking-request-status-changed/booking-request-status-changed.service';
import { ContractConcludedEvent } from './services/contract-concluded/contract-concluded.event';
import { ContractConcludedService } from './services/contract-concluded/contract-concluded.service';
import { ContractOfferSentEvent } from './services/contract-offer-sent/contract-offer-sent.event';
import { ContractOfferSentService } from './services/contract-offer-sent/contract-offer-sent.service';
import { ContractOfferStatusChangedEvent } from './services/contract-offer-status-changed/contract-offer-status-changed.event';
import { ContractOfferStatusChangedService } from './services/contract-offer-status-changed/contract-offer-status-changed.service';
import { NewMessageEvent } from './services/new-message/new-message.event';
import { NewMessageService } from './services/new-message/new-message.service';
import { PaymentTransferFailureEvent } from './services/payment-transfer-failure/payment-transfer-failure.event';
import { PaymentTransferFailureService } from './services/payment-transfer-failure/payment-transfer-failure.service';
import { PaymentTransferSuccessEvent } from './services/payment-transfer-success/payment-transfer-success.event';
import { PaymentTransferSuccessService } from './services/payment-transfer-success/payment-transfer-success.service';
import { RecurringPaymentLastWithdrawFailureEvent } from './services/recurring-payment-last-withdraw-failure/recurring-payment-last-withdraw-failure.event';
import { RecurringPaymentLastWithdrawFailureService } from './services/recurring-payment-last-withdraw-failure/recurring-payment-last-withdraw-failure.service';
import { RecurringPaymentWithdrawFailureEvent } from './services/recurring-payment-withdraw-failure/recurring-payment-withdraw-failure.event';
import { RecurringPaymentWithdrawFailureService } from './services/recurring-payment-withdraw-failure/recurring-payment-withdraw-failure.service';
import { RecurringPaymentWithdrawSuccessEvent } from './services/recurring-payment-withdraw-success/recurring-payment-withdraw-success.event';
import { RecurringPaymentWithdrawSuccessService } from './services/recurring-payment-withdraw-success/recurring-payment-withdraw-success.service';
import { RequireIdentityDocumentEvent } from './services/require-identity-document/require-identity-document.event';
import { RequireIdentityDocumentService } from './services/require-identity-document/require-identity-document.service';
import { VerificationEmailEvent } from './services/verification-email/verification-email.event';
import { VerificationEmailService } from './services/verification-email/verification-email.service';

@Injectable()
export class NotificationListener {
  isDevelopment: boolean;

  constructor(
    private readonly configService: ConfigService,
    private readonly newMessageService: NewMessageService,
    private readonly verificationEmailService: VerificationEmailService,
    private readonly requireIdentityDocumentService: RequireIdentityDocumentService,
    private readonly contractConcludedService: ContractConcludedService,
    private readonly recurringPaymentWithdrawSuccessService: RecurringPaymentWithdrawSuccessService,
    private readonly recurringPaymentWithdrawFailureService: RecurringPaymentWithdrawFailureService,
    private readonly paymentTransferSuccessService: PaymentTransferSuccessService,
    private readonly paymentTransferFailureService: PaymentTransferFailureService,
    private readonly recurringPaymentLastWithdrawFailureService: RecurringPaymentLastWithdrawFailureService,
    private readonly bookingRequestSentService: BookingRequestSentService,
    private readonly bookingRequestStatusChangedService: BookingRequestStatusChangedService,
    private readonly apartmentAdApprovedService: ApartmentAdApprovedService,
    private readonly apartmentAdRejectService: ApartmentAdRejectService,
    private readonly contractOfferStatudChangedService: ContractOfferStatusChangedService,
    private readonly contractOfferSentService: ContractOfferSentService,
  ) {
    this.isDevelopment = this.configService.get<string>('nodeEnv') === 'development';
  }

  @OnEvent(NewMessageEvent.eventName)
  async newMessage(payload: NewMessageEvent) {
    if (this.isDevelopment) {
      return;
    }

    this.newMessageService.handle(payload);
  }

  @OnEvent(VerificationEmailEvent.eventName)
  async verificationEmail(payload: VerificationEmailEvent) {
    if (this.isDevelopment) {
      return;
    }

    this.verificationEmailService.handle(payload);
  }

  @OnEvent(RequireIdentityDocumentEvent.eventName)
  async requireIdentityDocument(payload: RequireIdentityDocumentEvent) {
    if (this.isDevelopment) {
      return;
    }

    this.requireIdentityDocumentService.handle(payload);
  }

  @OnEvent(ContractConcludedEvent.eventName)
  async contractConcluded(payload: ContractConcludedEvent) {
    if (this.isDevelopment) {
      return;
    }

    this.contractConcludedService.handle(payload);
  }

  @OnEvent(RecurringPaymentWithdrawSuccessEvent.eventName)
  async recurringPaymentWithdrawSuccess(payload: RecurringPaymentWithdrawSuccessEvent) {
    if (this.isDevelopment) {
      return;
    }

    this.recurringPaymentWithdrawSuccessService.handle(payload);
  }

  @OnEvent(RecurringPaymentWithdrawFailureEvent.eventName)
  async recurringPaymentWithdrawFailure(payload: RecurringPaymentWithdrawFailureEvent) {
    if (this.isDevelopment) {
      return;
    }

    this.recurringPaymentWithdrawFailureService.handle(payload);
  }

  @OnEvent(PaymentTransferSuccessEvent.eventName)
  async recurringPaymentTransferSuccess(payload: PaymentTransferSuccessEvent) {
    if (this.isDevelopment) {
      return;
    }

    this.paymentTransferSuccessService.handle(payload);
  }

  @OnEvent(PaymentTransferFailureEvent.eventName)
  async recurringPaymentTransferFailure(payload: PaymentTransferFailureEvent) {
    if (this.isDevelopment) {
      return;
    }

    this.paymentTransferFailureService.handle(payload);
  }

  @OnEvent(RecurringPaymentLastWithdrawFailureEvent.eventName)
  async recurringPaymentLastWithdrawFailure(payload: RecurringPaymentLastWithdrawFailureEvent) {
    if (this.isDevelopment) {
      return;
    }

    this.recurringPaymentLastWithdrawFailureService.handle(payload);
  }

  @OnEvent(BookingRequestSentEvent.eventName)
  async bookingRequestSent(payload: BookingRequestSentEvent) {
    if (this.isDevelopment) {
      return;
    }

    this.bookingRequestSentService.handle(payload);
  }

  @OnEvent(ContractOfferSentEvent.eventName)
  async contractOfferSent(payload: ContractOfferSentEvent) {
    if (this.isDevelopment) {
      return;
    }

    this.contractOfferSentService.handle(payload);
  }

  @OnEvent(ApartmentAdApprovedEvent.eventName)
  async apartmentAdApproved(payload: ApartmentAdApprovedEvent) {
    if (this.isDevelopment) {
      return;
    }

    this.apartmentAdApprovedService.handle(payload);
  }

  @OnEvent(ApartmentAdRejectedEvent.eventName)
  async apartmentAdRejected(payload: ApartmentAdRejectedEvent) {
    if (this.isDevelopment) {
      return;
    }

    this.apartmentAdRejectService.handle(payload);
  }

  @OnEvent(ContractOfferStatusChangedEvent.eventName)
  async contractOfferStatusSent(payload: ContractOfferStatusChangedEvent) {
    if (this.isDevelopment) {
      return;
    }

    this.contractOfferStatudChangedService.handle(payload);
  }

  @OnEvent(BookingRequestStatusChangedEvent.eventName)
  async bookingRequestStatusChanged(payload: BookingRequestStatusChangedEvent) {
    if (this.isDevelopment) {
      return;
    }

    this.bookingRequestStatusChangedService.handle(payload);
  }
}
