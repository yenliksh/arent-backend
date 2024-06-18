import { CurrencyType } from '@domains/apartment-ad/domain/types';
import { costCeil } from '@domains/contract/base-classes/rental-strategies/utils/cost-rounds.util';
import { BaseContractModel } from '@domains/contract/models/contract.model';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { FieldFromResolver } from '@infrastructure/decorators/field-from-resolver.decorator';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { DateUtil } from '@libs/utils/date-util';
import { toMinorUnitString } from '@libs/utils/minimal-unit.helper';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { INNOPAY_CASH_OUT_TAX_RATE } from 'src/rental-context/constants';

import { PaymentTransactionEntity } from '../domain/entities/payment-transaction.entity';
import { PaymentTransactionStatus } from '../domain/types';

@ObjectType()
export class PaymentTransactionModel extends ModelBase {
  constructor(message: PaymentTransactionOrmEntity) {
    super(message);
  }

  @Field(() => String)
  contractId: string;

  @Field(() => CurrencyType)
  currency: CurrencyType;

  @Field(() => String)
  withdrawFundsDate: string;

  @Field(() => String)
  totalAmountPayable: string;

  @Field(() => String)
  totalAmountToBeTransferred: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;

  @Field(() => Float)
  senderTaxRate: number;

  @Field(() => Float)
  recipientTaxRate: number;

  @Field(() => Int)
  rentDays: number;

  @Field(() => String)
  cost: string;

  @Field(() => String)
  taxAmount: string;

  @Field(() => PaymentTransactionStatus)
  status: PaymentTransactionStatus;

  @Field(() => Boolean)
  isReadyToPay: boolean;

  @FieldFromResolver(() => BaseContractModel)
  contract?: BaseContractModel;

  static create(props: PaymentTransactionOrmEntity) {
    const payload = new PaymentTransactionModel(props);

    const assignObject: Omit<PaymentTransactionModel, keyof ModelBase> = {
      contractId: props.contractId,
      cost: toMinorUnitString(props.cost),
      currency: props.currency,
      endDate: props.endDate.toISOString(),
      recipientTaxRate: props.recipientTaxRate,
      rentDays: props.rentDays,
      senderTaxRate: props.senderTaxRate,
      startDate: props.startDate.toISOString(),
      status: props.status,
      taxAmount: toMinorUnitString(props.taxAmount),
      totalAmountPayable: toMinorUnitString(props.totalAmountPayable),
      totalAmountToBeTransferred: toMinorUnitString(
        costCeil(props.totalAmountToBeTransferred * (1 - INNOPAY_CASH_OUT_TAX_RATE)),
      ),
      withdrawFundsDate: props.withdrawFundsDate.toISOString(),
      isReadyToPay:
        DateUtil.parseUTC(props.withdrawFundsDate) <=
        DateUtil.utcNow().add(PaymentTransactionEntity.EARLY_PAY_DAYS, 'day'),
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}
