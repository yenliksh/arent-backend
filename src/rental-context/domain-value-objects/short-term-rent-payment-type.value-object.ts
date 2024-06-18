import { ShortTermRentPaymentType } from '@infrastructure/enums';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface ShortTermRentPaymentTypeProps {
  value: ShortTermRentPaymentType;
}

export class ShortTermRentPaymentTypeVO extends ValueObject<ShortTermRentPaymentTypeProps> {
  static create(type: ShortTermRentPaymentType) {
    return new ShortTermRentPaymentTypeVO({ value: type });
  }

  get value() {
    return this.props.value;
  }

  protected validate({ value }: ShortTermRentPaymentTypeProps): void {
    if (value && !Guard.isValidEnum(value, ShortTermRentPaymentType)) {
      throw new ArgumentInvalidException('Unexpected apartment type');
    }
  }
}
