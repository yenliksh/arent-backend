import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { ReversingInnopayTransactionHasEmptyFieldsError } from '../errors/reversing-innopay-transaction.errors';

export interface CreateReversingInnopayTransactionProps {
  customerReference: string;
}

export interface ReversingInnopayTransactionProps extends CreateReversingInnopayTransactionProps {
  isReversed: boolean;
}

export class ReversingInnopayTransactionEntity extends AggregateRoot<ReversingInnopayTransactionProps> {
  protected readonly _id: UUID;

  static create({ customerReference }: CreateReversingInnopayTransactionProps): ReversingInnopayTransactionEntity {
    const id = UUID.generate();

    const props: ReversingInnopayTransactionProps = {
      customerReference,
      isReversed: false,
    };

    const rentPeriodVersion = new ReversingInnopayTransactionEntity({ id, props });

    return rentPeriodVersion;
  }

  reverse() {
    this.props.isReversed = true;

    this.validate();
  }

  get id() {
    return this._id;
  }

  get customerReference() {
    return this.props.customerReference;
  }

  validate(): void {
    const { customerReference, isReversed } = this.props;

    const fields = [customerReference, isReversed];

    if (fields.some((f) => f == null)) {
      throw new ReversingInnopayTransactionHasEmptyFieldsError(
        'Reversing innopay transaction must to have complete all required fields',
      );
    }
  }
}
