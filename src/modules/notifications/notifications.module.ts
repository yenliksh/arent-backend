import { sesFactory } from '@infrastructure/configs/ses.factory';
import { snsFactory } from '@infrastructure/configs/sns.factory';
import { Module } from '@nestjs/common';
import { SimpleEmailModule } from '@third-parties/simple-email/src/simple-email.module';
import { SimpleNotificationModule } from '@third-parties/simple-notification/src';

import { WebhookReminderController } from './controllers/webhook-reminder.controller';
import { NotificationListener } from './notifications.listener';
import { ApartmentAdApprovedService } from './services/apartment-ad-approved/apartment-ad-approved.service';
import { ApartmentAdRejectService } from './services/apartment-ad-rejected/apartment-ad-rejected.service';
import { BookingRequestSentService } from './services/booking-request-sent/booking-request-sent.service';
import { BookingRequestStatusChangedService } from './services/booking-request-status-changed/booking-request-status-changed.service';
import { ContractConcludedService } from './services/contract-concluded/contract-concluded.service';
import { ContractOfferSentService } from './services/contract-offer-sent/contract-offer-sent.service';
import { ContractOfferStatusChangedService } from './services/contract-offer-status-changed/contract-offer-status-changed.service';
import { NewMessageService } from './services/new-message/new-message.service';
import { PaymentTransferFailureService } from './services/payment-transfer-failure/payment-transfer-failure.service';
import { PaymentTransferSuccessService } from './services/payment-transfer-success/payment-transfer-success.service';
import { RecurringPaymentLastWithdrawFailureService } from './services/recurring-payment-last-withdraw-failure/recurring-payment-last-withdraw-failure.service';
import { RecurringPaymentWithdrawFailureService } from './services/recurring-payment-withdraw-failure/recurring-payment-withdraw-failure.service';
import { RecurringPaymentWithdrawSuccessService } from './services/recurring-payment-withdraw-success/recurring-payment-withdraw-success.service';
import { ReminderNeedToPayRentService } from './services/reminder-need-to-pay-rent/reminder-need-to-pay-rent.service';
import { RequireIdentityDocumentService } from './services/require-identity-document/require-identity-document.service';
import { VerificationEmailService } from './services/verification-email/verification-email.service';

const thirdPartyServices = [
  SimpleNotificationModule.forRootAsync(snsFactory),
  SimpleEmailModule.forRootAsync(sesFactory),
];

const notificationServices = [
  NewMessageService,
  VerificationEmailService,
  RequireIdentityDocumentService,
  ContractConcludedService,
  RecurringPaymentWithdrawSuccessService,
  RecurringPaymentWithdrawFailureService,
  PaymentTransferSuccessService,
  PaymentTransferFailureService,
  ReminderNeedToPayRentService,
  RecurringPaymentLastWithdrawFailureService,
  BookingRequestSentService,
  BookingRequestStatusChangedService,
  ApartmentAdApprovedService,
  ApartmentAdRejectService,
  ContractOfferStatusChangedService,
  ContractOfferSentService,
];

@Module({
  imports: [...thirdPartyServices],
  controllers: [WebhookReminderController],
  providers: [NotificationListener, ...notificationServices],
})
export class NotificationsModule {}
