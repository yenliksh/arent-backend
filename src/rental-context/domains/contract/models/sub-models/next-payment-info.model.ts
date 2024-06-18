import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NextPaymentInfoModel extends ModelBase {
  constructor(message: PaymentTransactionOrmEntity) {
    super(message);
  }

  @Field(() => String)
  contractId: string;

  @Field(() => String)
  withdrawFundsDate: string;

  static create(props: PaymentTransactionOrmEntity) {
    const payload = new NextPaymentInfoModel(props);

    const assignObject: Omit<NextPaymentInfoModel, keyof ModelBase> = {
      contractId: props.contractId,
      withdrawFundsDate: props.withdrawFundsDate.toISOString(),
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}
