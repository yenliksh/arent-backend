import { DomainPrimitive, ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { ArgumentInvalidException } from '@libs/exceptions';

export class BookingAccessInMonthVO extends ValueObject<number> {
  get value() {
    return this.props.value;
  }

  protected validate(props: DomainPrimitive<number>): void {
    const { value } = props;

    const validNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    if (!validNumbers.includes(value)) {
      throw new ArgumentInvalidException('Unexpected booking access in month value');
    }
  }
}
