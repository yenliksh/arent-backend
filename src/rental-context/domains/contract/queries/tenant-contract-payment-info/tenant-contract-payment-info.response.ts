import { ContractPaymentStatusType } from '@domains/contract/types';
import { toMinorUnitString } from '@libs/utils/minimal-unit.helper';
import { Field, ObjectType } from '@nestjs/graphql';

import { TenantContractPaymentInfo } from './tenant-contract-payment-info.service';

@ObjectType()
export class TenantContractPaymentInfoResponse {
  @Field(() => ContractPaymentStatusType)
  type: ContractPaymentStatusType;

  @Field(() => String)
  paidAmount: string;

  @Field(() => String)
  payableAmount: string;

  @Field(() => String)
  totalAmount: string;

  @Field(() => String)
  refundsAmount: string;

  @Field(() => String, { nullable: true })
  payableAmountOfNextCharge?: string;

  @Field(() => String, { nullable: true })
  dateOfNextCharge?: string;

  @Field(() => String, { nullable: true })
  accommodationAvailableDate?: string;

  @Field(() => String, { nullable: true })
  cancellationDate?: string;

  static create(props: TenantContractPaymentInfo) {
    const payload = new TenantContractPaymentInfoResponse();

    payload.type = props.type;
    payload.paidAmount = toMinorUnitString(props.paidAmount);
    payload.payableAmount = toMinorUnitString(props.payableAmount);
    payload.totalAmount = toMinorUnitString(props.totalAmount);
    payload.refundsAmount = toMinorUnitString(props.refundsAmount);
    payload.payableAmountOfNextCharge = props.payableAmountOfNextCharge
      ? toMinorUnitString(props.payableAmountOfNextCharge)
      : undefined;
    payload.dateOfNextCharge = props.dateOfNextCharge ? props.dateOfNextCharge.toISOString() : undefined;
    payload.accommodationAvailableDate = props.accommodationAvailableDate
      ? props.accommodationAvailableDate.toISOString()
      : undefined;
    payload.cancellationDate = props.cancellationDate?.toISOString();

    return payload;
  }
}
