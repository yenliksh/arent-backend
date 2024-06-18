import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

import { ApartmentCategory } from '../types';

export interface ApartmentCategoryProps {
  value: ApartmentCategory;
}

export class ApartmentCategoryVO extends ValueObject<ApartmentCategoryProps> {
  static create(type: ApartmentCategory) {
    return new ApartmentCategoryVO({ value: type });
  }

  get value() {
    return this.props.value;
  }

  protected validate({ value }: ApartmentCategoryProps): void {
    if (value && !Guard.isValidEnum(value, ApartmentCategory)) {
      throw new ArgumentInvalidException('Unexpected apartment type');
    }
  }
}
