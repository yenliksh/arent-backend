import {
  LongPeriodTenantCheckOutCancelationType,
  PaymentTenantCancelationResponse,
} from '@domains/contract/base-classes/rental-cancelation-strategies/types';
import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { toMinorUnitString } from '@libs/utils/minimal-unit.helper';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TenantContractCancelationInfoResponse {
  @Field(() => RentPeriodStrategyType)
  strategyType: RentPeriodStrategyType;

  @Field(() => String)
  cancelationDate: string;

  @Field(() => String)
  checkOutDate: string;

  @Field(() => String, { description: 'money which will bee refund' })
  refundsAmount: string;

  @Field(() => String, { nullable: true, description: 'money which will bee withdrawal' })
  withdrawalAmount?: string;

  @Field(() => String, { nullable: true, description: 'recomputed withdrawal for last stay month' })
  recomputedLastStayWithdrawalAmount?: string;

  @Field(() => LongPeriodTenantCheckOutCancelationType, { nullable: true })
  checkoutType?: LongPeriodTenantCheckOutCancelationType;

  static create(props: PaymentTenantCancelationResponse<RentPeriodStrategyType>) {
    const payload = new TenantContractCancelationInfoResponse();

    payload.strategyType = props.strategyType;
    payload.cancelationDate = props.cancelationDate;
    payload.checkOutDate = props.checkOutDate;
    payload.refundsAmount = toMinorUnitString(props.refundsAmountToSender);
    payload.withdrawalAmount = isLongPeriodCancelation(props)
      ? toMinorUnitString(props.withdrawalAmountFromSender || 0)
      : undefined;
    payload.checkoutType = isLongPeriodCancelation(props) ? props.checkoutType : undefined;
    payload.recomputedLastStayWithdrawalAmount = isLongPeriodCancelation(props)
      ? toMinorUnitString(props?.recomputedLastStayTransaction?.totalAmountPayable || 0)
      : undefined;

    return payload;
  }
}

const isLongPeriodCancelation = (
  props: PaymentTenantCancelationResponse<RentPeriodStrategyType>,
): props is PaymentTenantCancelationResponse<
  RentPeriodStrategyType.LONG_TERM_RENT | RentPeriodStrategyType.MIDDLE_TERM_RENT
> => {
  return (
    (
      props as PaymentTenantCancelationResponse<
        RentPeriodStrategyType.LONG_TERM_RENT | RentPeriodStrategyType.MIDDLE_TERM_RENT
      >
    ).strategyType === RentPeriodStrategyType.LONG_TERM_RENT ||
    (
      props as PaymentTenantCancelationResponse<
        RentPeriodStrategyType.LONG_TERM_RENT | RentPeriodStrategyType.MIDDLE_TERM_RENT
      >
    ).strategyType === RentPeriodStrategyType.MIDDLE_TERM_RENT
  );
};
