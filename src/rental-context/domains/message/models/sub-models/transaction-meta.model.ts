import { ISystemMessagePaymentTransactionMeta } from '@domains/message/domain/types';
import { PaymentTransactionStatus } from '@domains/payment-transaction/domain/types';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TransactionMetaModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;

  @Field(() => String)
  withdrawFundsDate: string;

  @Field(() => PaymentTransactionStatus)
  status: PaymentTransactionStatus;

  static create(props: ISystemMessagePaymentTransactionMeta) {
    const instance = new TransactionMetaModel();

    const assignObject: TransactionMetaModel = {
      id: props.id,
      startDate: props.startDate,
      endDate: props.startDate,
      withdrawFundsDate: props.withdrawFundsDate,
      status: props.status,
    };

    return Object.assign(instance, assignObject);
  }
}
