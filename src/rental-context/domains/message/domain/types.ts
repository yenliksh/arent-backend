import { ApartmentRulesProps } from '@domain-value-objects/apartment-rules.value-object';
import { PaymentTransactionMeta } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import {
  ApartmentRentPeriodType,
  ContractStatus,
  LongTermRentCancellationPolicyType,
  ShortTermRentBookingType,
  ShortTermRentCancellationPolicyType,
  ShortTermRentPaymentType,
} from '@infrastructure/enums';
import { registerEnumType } from '@nestjs/graphql';

export enum MessageType {
  TEXT = 'TEXT',
  MEDIA = 'MEDIA',
  SYSTEM = 'SYSTEM',
}

registerEnumType(MessageType, {
  name: 'MessageType',
});

export enum SystemMessageType {
  OFFER_REJECTED = 'OFFER_REJECTED',
  OFFER_REJECTED_BY_SYSTEM = 'OFFER_REJECTED_BY_SYSTEM',
  INSTANT_BOOKING = 'INSTANT_BOOKING',
  BOOKING_CONCLUDED = 'BOOKING_CONCLUDED',
  BOOKING_CREATED = 'BOOKING_CREATED',
  OFFER_SENDING = 'OFFER_SENDING',
  TEMPORARY_BOOKING_REVOKE = 'TEMPORARY_BOOKING_REVOKE',
}

registerEnumType(SystemMessageType, {
  name: 'SystemMessageType',
});

export interface BaseSystemMessageData {
  rules?: ApartmentRulesProps;
  cost?: number;
  shortTermRentCancellationPolicyType?: ShortTermRentCancellationPolicyType;
  longTermRentCancellationPolicyType?: LongTermRentCancellationPolicyType;
  apartmentRentPeriodType?: ApartmentRentPeriodType;
  comment?: string;
  status: ContractStatus;
  shortTermRentBookingType?: ShortTermRentBookingType;
  shortTermRentPaymentType?: ShortTermRentPaymentType;
}

export interface ISystemMessageData extends BaseSystemMessageData {
  arrivalDate?: Date;
  departureDate?: Date;
  transactionsMeta?: PaymentTransactionMeta[];
}

export type ISystemMessagePaymentTransactionMeta = Omit<
  PaymentTransactionMeta,
  'startDate' | 'endDate' | 'withdrawFundsDate'
> & {
  startDate: string;
  endDate: string;
  withdrawFundsDate: string;
};

export interface ISystemMessageOrmData extends BaseSystemMessageData {
  arrivalDate?: string;
  departureDate?: string;
  transactionsMeta?: ISystemMessagePaymentTransactionMeta[];
}

export type MessageCursorType = {
  id: string;
  createdAt: Date;
};

export enum MessageStatus {
  SENT = 'SENT',
  WAITING = 'WAITING',
  FAILED = 'FAILED',
}

registerEnumType(MessageStatus, {
  name: 'MessageStatus',
});
