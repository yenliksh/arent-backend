import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

import { ApartmentType } from '../types';

export interface ApartmentTypeProps {
  value: ApartmentType;
}

export class ApartmentTypeVO extends ValueObject<ApartmentTypeProps> {
  static create(type: ApartmentType) {
    return new ApartmentTypeVO({ value: type });
  }

  get value() {
    return this.props.value;
  }

  protected validate({ value }: ApartmentTypeProps): void {
    if (value && !Guard.isValidEnum(value, ApartmentType)) {
      throw new ArgumentInvalidException('Unexpected apartment type');
    }
  }
}
