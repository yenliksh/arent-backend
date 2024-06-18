import { CostAndCurrencyVO } from '@domain-value-objects/cost-and-currency.value-object';
import { TaxVO } from '@domain-value-objects/tax.value-object';
import {
  TemporaryPaymentTransactionEntity,
  TemporaryPaymentTransactionProps,
} from '@domains/temporary-payment-transaction/domain/entities/temporary-payment-transaction.entity';
import { TemporaryPaymentTransactionOrmEntity } from '@infrastructure/database/entities/temporary-payment-transaction.orm-entity';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { EntityProps, OrmEntityProps, OrmMapper } from '@libs/ddd/infrastructure/database/orm-mapper.base';
import { DateUtil } from '@libs/utils/date-util';

export class TemporaryPaymentTransactionOrmMapper extends OrmMapper<
  TemporaryPaymentTransactionEntity,
  TemporaryPaymentTransactionOrmEntity
> {
  protected async toOrmProps(
    entity: TemporaryPaymentTransactionEntity,
  ): Promise<OrmEntityProps<TemporaryPaymentTransactionOrmEntity>> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<TemporaryPaymentTransactionOrmEntity> = {
      contractId: props.contractId.value,

      withdrawFundsDate: DateUtil.parseUTC(props.withdrawFundsDate.value).toDate(),
      totalAmountPayable: props.totalAmountPayable.cost,
      totalAmountToBeTransferred: props.totalAmountToBeTransferred.cost,
      totalRevenue: props.totalRevenue.cost,

      startDate: DateUtil.parseUTC(props.startDate.value).toDate(),
      endDate: DateUtil.parseUTC(props.endDate.value).toDate(),
      senderTaxRate: props.senderTaxRate.value,
      recipientTaxRate: props.recipientTaxRate.value,
      rentDays: props.rentDays,
      cost: props.cost.cost,
      currency: props.cost.currency,
      taxAmount: props.taxAmount.cost,

      isFirst: props.isFirst,
    };

    return ormProps;
  }

  protected async toDomainProps(
    ormEntity: TemporaryPaymentTransactionOrmEntity,
  ): Promise<EntityProps<TemporaryPaymentTransactionProps>> {
    const id = new UUID(ormEntity.id);

    const props: TemporaryPaymentTransactionProps = {
      contractId: new UUID(ormEntity.contractId),
      totalAmountPayable: CostAndCurrencyVO.create({
        cost: ormEntity.totalAmountPayable,
        currency: ormEntity.currency,
      }),
      totalAmountToBeTransferred: CostAndCurrencyVO.create({
        cost: ormEntity.totalAmountToBeTransferred,
        currency: ormEntity.currency,
      }),
      totalRevenue: CostAndCurrencyVO.create({
        cost: ormEntity.totalRevenue,
        currency: ormEntity.currency,
      }),
      withdrawFundsDate: new DateTimeISOTZVO(ormEntity.withdrawFundsDate.toISOString()),
      startDate: new DateTimeISOTZVO(ormEntity.startDate.toISOString()),
      endDate: new DateTimeISOTZVO(ormEntity.endDate.toISOString()),
      senderTaxRate: new TaxVO({ value: ormEntity.senderTaxRate }),
      recipientTaxRate: new TaxVO({ value: ormEntity.recipientTaxRate }),
      rentDays: ormEntity.rentDays,
      cost: CostAndCurrencyVO.create({ cost: ormEntity.cost, currency: ormEntity.currency }),
      taxAmount: CostAndCurrencyVO.create({ cost: ormEntity.taxAmount, currency: ormEntity.currency }),
      isFirst: ormEntity.isFirst,
    };

    return { id, props };
  }
}
