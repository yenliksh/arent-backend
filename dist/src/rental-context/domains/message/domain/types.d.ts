import { ApartmentRulesProps } from '@domain-value-objects/apartment-rules.value-object';
import { PaymentTransactionMeta } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { ApartmentRentPeriodType, ContractStatus, LongTermRentCancellationPolicyType, ShortTermRentBookingType, ShortTermRentCancellationPolicyType, ShortTermRentPaymentType } from '@infrastructure/enums';
export declare enum MessageType {
    TEXT = "TEXT",
    MEDIA = "MEDIA",
    SYSTEM = "SYSTEM"
}
export declare enum SystemMessageType {
    OFFER_REJECTED = "OFFER_REJECTED",
    OFFER_REJECTED_BY_SYSTEM = "OFFER_REJECTED_BY_SYSTEM",
    INSTANT_BOOKING = "INSTANT_BOOKING",
    BOOKING_CONCLUDED = "BOOKING_CONCLUDED",
    BOOKING_CREATED = "BOOKING_CREATED",
    OFFER_SENDING = "OFFER_SENDING",
    TEMPORARY_BOOKING_REVOKE = "TEMPORARY_BOOKING_REVOKE"
}
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
export declare type ISystemMessagePaymentTransactionMeta = Omit<PaymentTransactionMeta, 'startDate' | 'endDate' | 'withdrawFundsDate'> & {
    startDate: string;
    endDate: string;
    withdrawFundsDate: string;
};
export interface ISystemMessageOrmData extends BaseSystemMessageData {
    arrivalDate?: string;
    departureDate?: string;
    transactionsMeta?: ISystemMessagePaymentTransactionMeta[];
}
export declare type MessageCursorType = {
    id: string;
    createdAt: Date;
};
export declare enum MessageStatus {
    SENT = "SENT",
    WAITING = "WAITING",
    FAILED = "FAILED"
}
