import { PaymentTransactionEntity } from '@domains/payment-transaction/domain/entities/payment-transaction.entity';
import {
  LongTermRentCancellationPolicyType,
  MiddleTermRentCancellationPolicyType,
  ShortTermRentCancellationPolicyType,
} from '@infrastructure/enums';
import { registerEnumType } from '@nestjs/graphql';

import { RentPeriodStrategyType } from '../rental-manager/types';

export enum AFPredefinedEventNames {
  AFEventLogin = 'af_login',
}

export enum ShortPeriodTenantCHeckoutCancelationType {}

export enum LongPeriodTenantCheckOutCancelationType {
  CANCELATION_BY_ADMIN = 'CANCELATION_BY_ADMIN',
  /*
   * Отмена через 24 часа после брони - полный возврат
   * https://www.figma.com/file/z1brevbio2GpCKVZUJXASd/Livin-%E2%80%93-MVP-Prod?node-id=1175%3A103267
   */
  // 1. Арендатор может отменить аренду, если прошло не больше 24 часов с момента бронирования
  ALLOWED_REFUND = 'ALLOWED_REFUND', // less than 24 hours have passed since booking

  REFUND_BEFORE_THIRTY_DAYS_ARRIVAL = 'REFUND_BEFORE_THIRTY_DAYS_ARRIVAL', // the same as ALLOWED_REFUND but need for show different cancelation text on FE side
  NOT_ALLOWED_REFUND = 'NOT_ALLOWED_REFUND', // only for middle after 24 hours passed since booking

  // 4. Отменяю еще не заехав, но уже прошло 24 часа -> мне будет возврат (например заехать должна через 7 дней, отменяю -> мне должны вернуть 7 дней)
  PARTIAL_REFUND = 'PARTIAL_REFUND', // more than 24 hours have passed since booking but not yet stay time
  /*
   * Если уведомляют менше чем за 30 дней
   * https://www.figma.com/file/z1brevbio2GpCKVZUJXASd/Livin-%E2%80%93-MVP-Prod?node-id=1175%3A103267
   */
  // 2. Отменяю и до конца отмены меньше, чем 30 дней -> у пользователя спишется доп количество дней, чтобы было оплачено за 30 дней с момента отмены
  CHECK_OUT_LESS_THAN_THIRTY_DAYS_NOTICE = 'CHECK_OUT_LESS_THAN_THIRTY_DAYS_NOTICE',
  /*
   * Выезжает больше чем за 30 дней, надо перерасчет за остаток
   * https://www.figma.com/file/z1brevbio2GpCKVZUJXASd/Livin-%E2%80%93-MVP-Prod?node-id=2180%3A109559
   */
  // 1. Отменяю, когда до конца отмены остается ровно 30 дней или больше-> перерасчет последнего платежа
  CHECK_OUT_GREATER_THAN_THIRTY_DAYS_NOTICE = 'CHECK_OUT_GREATER_THAN_THIRTY_DAYS_NOTICE',
  // /*
  //  * Если всего ровно хватает
  //  * https://www.figma.com/file/z1brevbio2GpCKVZUJXASd/Livin-%E2%80%93-MVP-Prod?node-id=2180%3A109869
  //  */
  // CHECK_OUT_EQUAL_THIRTY_HOURS_NOTICE = 'CHECK_OUT_EQUAL_THIRTY_HOURS_NOTICE',
}

registerEnumType(LongPeriodTenantCheckOutCancelationType, {
  name: 'LongPeriodTenantCheckOutCancelationType',
});

interface BasePaymentTenantCancelationResponse {
  cancelationDate: string; // дата совершения отмены
  checkOutDate: string; // новая дата выезда
  refundsAmountToSender: number; // деньги которые нужно вернуть тенанту
  transferAmountToRecipient: number; // деньги которые нужно перевести из сабсчета лендлорду
  transferAmountToPlatform: number; // деньги которые нужно перевести Livin
}

interface BaseLongPeriodPaymentTenantCancelationResponse {
  withdrawalAmountFromSender?: number; // деньги которые нужно списать с тенанта
  recomputedLastStayTransaction?: PaymentTransactionEntity; // only for long/middle term rent cancelation
}

export interface PaymentTenantCancelationResponseMap {
  [RentPeriodStrategyType.SHORT_TERM_RENT]: BasePaymentTenantCancelationResponse & {
    strategyType: RentPeriodStrategyType.SHORT_TERM_RENT;
    cancelationPolicyType: ShortTermRentCancellationPolicyType;
  };
  [RentPeriodStrategyType.MIDDLE_TERM_RENT]: BasePaymentTenantCancelationResponse &
    BaseLongPeriodPaymentTenantCancelationResponse & {
      strategyType: RentPeriodStrategyType.MIDDLE_TERM_RENT;
      cancelationPolicyType: MiddleTermRentCancellationPolicyType;
      checkoutType: LongPeriodTenantCheckOutCancelationType;
    };
  [RentPeriodStrategyType.LONG_TERM_RENT]: BasePaymentTenantCancelationResponse &
    BaseLongPeriodPaymentTenantCancelationResponse & {
      strategyType: RentPeriodStrategyType.LONG_TERM_RENT;
      cancelationPolicyType: LongTermRentCancellationPolicyType;
      checkoutType: LongPeriodTenantCheckOutCancelationType;
    };
}

export type PaymentTenantCancelationResponse<T extends keyof PaymentTenantCancelationResponseMap> =
  PaymentTenantCancelationResponseMap[T];

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
  cancelationDate: string; // дата совершения отмены
  checkOutDate: string; // новая дата выезда
  refundsAmountToSender: number; // деньги которые нужно вернуть тенанту
  withdrawalAmountFromRecipient: number; // деньги которые нужно списать с лендлорда
  transferAmountToRecipient: number; // деньги которые нужно перевести из сабсчета лендлорду
  transferAmountToPlatform: number; // деньги которые нужно перевести Livin
  isFine: boolean; // если true значит инкрементируем штраф лендлорду (user.entity)
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

export type PaymentLandlordCancelationResponse<T extends keyof PaymentLandlordCancelationResponseMap> =
  PaymentLandlordCancelationResponseMap[T];

export enum PeriodTypes {
  BEFORE_ARRIVAL = 'BEFORE_ARRIVAL',
  WITHIN_24_HOURS_OF_STAY = 'WITHIN_24_HOURS_OF_STAY',
  WHILE_LIVING = 'WHILE_LIVING',
}
