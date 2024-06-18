import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import { LongTermRentCancellationPolicyType, MiddleTermRentCancellationPolicyType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { RentPeriodStrategyType } from '../rental-manager/types';
export declare enum AFPredefinedEventNames {
    AFEventLogin = "af_login"
}
export declare enum ShortPeriodTenantCHeckoutCancelationType {
}
export declare enum LongPeriodTenantCheckOutCancelationType {
    CANCELATION_BY_ADMIN = "CANCELATION_BY_ADMIN",
    ALLOWED_REFUND = "ALLOWED_REFUND",
    REFUND_BEFORE_THIRTY_DAYS_ARRIVAL = "REFUND_BEFORE_THIRTY_DAYS_ARRIVAL",
    NOT_ALLOWED_REFUND = "NOT_ALLOWED_REFUND",
    PARTIAL_REFUND = "PARTIAL_REFUND",
    CHECK_OUT_LESS_THAN_THIRTY_DAYS_NOTICE = "CHECK_OUT_LESS_THAN_THIRTY_DAYS_NOTICE",
    CHECK_OUT_GREATER_THAN_THIRTY_DAYS_NOTICE = "CHECK_OUT_GREATER_THAN_THIRTY_DAYS_NOTICE"
}
interface BasePaymentTenantCancelationResponse {
    cancelationDate: string;
    checkOutDate: string;
    refundsAmountToSender: number;
    transferAmountToRecipient: number;
    transferAmountToPlatform: number;
}
interface BaseLongPeriodPaymentTenantCancelationResponse {
    withdrawalAmountFromSender?: number;
    recomputedLastStayTransaction?: PaymentTransactionEntity;
}
export interface PaymentTenantCancelationResponseMap {
    [RentPeriodStrategyType.SHORT_TERM_RENT]: BasePaymentTenantCancelationResponse & {
        strategyType: RentPeriodStrategyType.SHORT_TERM_RENT;
        cancelationPolicyType: ShortTermRentCancellationPolicyType;
    };
    [RentPeriodStrategyType.MIDDLE_TERM_RENT]: BasePaymentTenantCancelationResponse & BaseLongPeriodPaymentTenantCancelationResponse & {
        strategyType: RentPeriodStrategyType.MIDDLE_TERM_RENT;
        cancelationPolicyType: MiddleTermRentCancellationPolicyType;
        checkoutType: LongPeriodTenantCheckOutCancelationType;
    };
    [RentPeriodStrategyType.LONG_TERM_RENT]: BasePaymentTenantCancelationResponse & BaseLongPeriodPaymentTenantCancelationResponse & {
        strategyType: RentPeriodStrategyType.LONG_TERM_RENT;
        cancelationPolicyType: LongTermRentCancellationPolicyType;
        checkoutType: LongPeriodTenantCheckOutCancelationType;
    };
}
export declare type PaymentTenantCancelationResponse<T extends keyof PaymentTenantCancelationResponseMap> = PaymentTenantCancelationResponseMap[T];
export interface ICancelationRulesMeta {
    timeBeforeArrivalInHours?: number;
    minTimeBeforeArrivalInHours?: number;
    relativeBooking?: {
        cancellationTime: number;
        arrivingDaysLeftInHours: number;
    };
    cancellationFeeRateSoft: number;
    cancellationFeeRateHard: number;
    seriousReasonTimeInHours: number;
}
interface BasePaymentLandlordCancelationResponse {
    cancelationDate: string;
    checkOutDate: string;
    refundsAmountToSender: number;
    withdrawalAmountFromRecipient: number;
    transferAmountToRecipient: number;
    transferAmountToPlatform: number;
    isFine: boolean;
}
export interface PaymentLandlordCancelationResponseMap {
    [RentPeriodStrategyType.SHORT_TERM_RENT]: BasePaymentLandlordCancelationResponse & {
        strategyType: RentPeriodStrategyType.SHORT_TERM_RENT;
    };
    [RentPeriodStrategyType.MIDDLE_TERM_RENT]: BasePaymentLandlordCancelationResponse & {
        strategyType: RentPeriodStrategyType.MIDDLE_TERM_RENT;
    };
    [RentPeriodStrategyType.LONG_TERM_RENT]: BasePaymentLandlordCancelationResponse & {
        strategyType: RentPeriodStrategyType.LONG_TERM_RENT;
    };
}
export declare type PaymentLandlordCancelationResponse<T extends keyof PaymentLandlordCancelationResponseMap> = PaymentLandlordCancelationResponseMap[T];
export declare enum PeriodTypes {
    BEFORE_ARRIVAL = "BEFORE_ARRIVAL",
    WITHIN_24_HOURS_OF_STAY = "WITHIN_24_HOURS_OF_STAY",
    WHILE_LIVING = "WHILE_LIVING"
}
export {};
