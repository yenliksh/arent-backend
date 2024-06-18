import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

import { RentPeriodType } from '../types';

export interface RentPeriodTypeProps {
  value: RentPeriodType;
}

export class RentPeriodTypeVO extends ValueObject<RentPeriodTypeProps> {
  static create(type: RentPeriodType) {
    return new RentPeriodTypeVO({ value: type });
  }

  get value() {
    return this.props.value;
  }

  protected validate({ value }: RentPeriodTypeProps): void {
    if (value && !Guard.isValidEnum(value, RentPeriodType)) {
      throw new ArgumentInvalidException('Unexpected rent period type');
    }
  }
}
