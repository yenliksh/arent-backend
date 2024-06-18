import { PaymentTransactionBase } from '@domains/payment-transaction/domain/entities/types';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { Guard } from '@libs/ddd/domain/guard';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';

import { TemporaryPaymentTransactionHasEmptyFieldsError } from '../errors/temporary-payment-transaction.errors';

export interface CreateTemporaryPaymentTransactionProps extends PaymentTransactionBase {
  contractId: UUID;
  isFirst: boolean;
}

export type TemporaryPaymentTransactionProps = CreateTemporaryPaymentTransactionProps;

export class TemporaryPaymentTransactionEntity extends AggregateRoot<TemporaryPaymentTransactionProps> {
  protected readonly _id: UUID;

  static create({
    contractId,
    isFirst,
    cost,
    endDate,
    recipientTaxRate,
    rentDays,
    senderTaxRate,
    startDate,
    taxAmount,
    totalAmountPayable,
    totalAmountToBeTransferred,
    totalRevenue,
    withdrawFundsDate,
  }: CreateTemporaryPaymentTransactionProps): TemporaryPaymentTransactionEntity {
    const id = UUID.generate();

    const props: TemporaryPaymentTransactionProps = {
      contractId,
      isFirst,
      cost,
      endDate,
      recipientTaxRate,
      rentDays,
      senderTaxRate,
      startDate,
      taxAmount,
      totalAmountPayable,
      totalAmountToBeTransferred,
      totalRevenue,
      withdrawFundsDate,
    };

    const temporaryTransaction = new TemporaryPaymentTransactionEntity({ id, props });

    return temporaryTransaction;
  }

  get isFirst() {
    return this.props.isFirst;
  }

  get totalAmountPayable() {
    return this.props.totalAmountPayable.cost;
  }

  get withdrawFundsDate() {
    return this.props.withdrawFundsDate.value;
  }

  validate(): void {
    const {
      contractId,
      isFirst,
      withdrawFundsDate,
      totalAmountPayable,
      startDate,
      endDate,
      senderTaxRate,
      recipientTaxRate,
      rentDays,
      cost,
      taxAmount,
      totalAmountToBeTransferred,
      totalRevenue,
    } = this.props;

    const fields = [
      contractId,
      withdrawFundsDate,
      totalAmountPayable,
      startDate,
      endDate,
      senderTaxRate,
      recipientTaxRate,
      rentDays,
      cost,
      taxAmount,
      isFirst,
      totalAmountToBeTransferred,
      totalRevenue,
    ];

    if (fields.some((f) => f == null)) {
      throw new TemporaryPaymentTransactionHasEmptyFieldsError(
        'Temporary transaction must to have complete all required fields',
      );
    }
    if (!Guard.isPositiveNumber(rentDays)) {
      throw new ArgumentInvalidException('Rented days must be positive number');
    }
  }
}
