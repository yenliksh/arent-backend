import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { Guard } from '@libs/ddd/domain/guard';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface CreateRentPeriodVersionProps {
  version: number;
  shortTermRentMonth: number[];
  middleTermRentMonth: number[];
  longTermRentMonth: number[];
}

export type RentPeriodVersionProps = CreateRentPeriodVersionProps;

export class RentPeriodVersionEntity extends AggregateRoot<RentPeriodVersionProps> {
  protected readonly _id: UUID;

  static create({
    shortTermRentMonth,
    middleTermRentMonth,
    longTermRentMonth,
    version,
  }: CreateRentPeriodVersionProps): RentPeriodVersionEntity {
    const id = UUID.generate();

    const props: RentPeriodVersionProps = {
      shortTermRentMonth,
      middleTermRentMonth,
      longTermRentMonth,
      version,
    };

    const rentPeriodVersion = new RentPeriodVersionEntity({ id, props });

    return rentPeriodVersion;
  }

  get id() {
    return this._id;
  }

  get shortTermRentMonth(): number[] {
    return this.props.shortTermRentMonth;
  }

  get middleTermRentMonth(): number[] {
    return this.props.middleTermRentMonth;
  }

  get longTermRentMonth(): number[] {
    return this.props.longTermRentMonth;
  }

  validate(): void {
    const { shortTermRentMonth, middleTermRentMonth, longTermRentMonth } = this.props;

    if (
      !Guard.lengthIsBetween(shortTermRentMonth, 1, 2) ||
      !Guard.lengthIsBetween(middleTermRentMonth, 1, 2) ||
      !Guard.lengthIsBetween(longTermRentMonth, 1, 2)
    ) {
      // period length is 1 if period set in fix month count
      // period length is 2 if period set in the range
      throw new ArgumentInvalidException('Periods length must be 1 or 2');
    }
  }
}
