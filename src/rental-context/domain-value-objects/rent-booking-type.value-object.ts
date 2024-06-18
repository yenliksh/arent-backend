import { ShortTermRentBookingType } from '@infrastructure/enums';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface ShortTermRentBookingTypeProps {
  value: ShortTermRentBookingType;
}

export class ShortTermRentBookingTypeVO extends ValueObject<ShortTermRentBookingTypeProps> {
  static create(type: ShortTermRentBookingType) {
    return new ShortTermRentBookingTypeVO({ value: type });
  }

  get value() {
    return this.props.value;
  }

  protected validate({ value }: ShortTermRentBookingTypeProps): void {
    if (value && !Guard.isValidEnum(value, ShortTermRentBookingType)) {
      throw new ArgumentInvalidException('Unexpected apartment type');
    }
  }
}
