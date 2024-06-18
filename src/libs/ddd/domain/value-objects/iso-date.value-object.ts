import { isISO8601 } from 'class-validator';

import { ArgumentInvalidException } from '../../../exceptions';
import { DomainPrimitive, ValueObject } from '../base-classes/value-object.base';

export class DateISOVO extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  public get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (
      value.length !== 10 ||
      !isISO8601(value, {
        strict: true,
      })
    ) {
      throw new ArgumentInvalidException('string is not in iso format ex. YYYY-MM-DD');
    }
  }
}
