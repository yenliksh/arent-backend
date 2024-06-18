import { DomainPrimitive, ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface TaxProps {
  value: number;
}

export class TaxVO extends ValueObject<number> {
  get value() {
    return this.props.value;
  }

  protected validate(props: DomainPrimitive<number>): void {
    if (Guard.isNegative(props.value)) {
      throw new ArgumentInvalidException('Tax must be positive number');
    }

    if (props.value > 1) {
      throw new ArgumentInvalidException('Tax rate cannot be more than 1');
    }
  }
}
