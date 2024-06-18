import { DateUtil } from '@libs/utils/date-util';
import { isISO8601 } from 'class-validator';

import { ArgumentInvalidException } from '../../../exceptions';
import { DomainPrimitive, ValueObject } from '../base-classes/value-object.base';

export class DateTimeISOTZVO extends ValueObject<string> {
  constructor(value?: string) {
    const date = value ? DateUtil.parse(value) : DateUtil.utcNow();
    super({ value: date.toISOString() });
  }

  getDate() {
    return new Date(this.props.value);
  }

  public get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (
      value.length !== 24 ||
      !isISO8601(value, {
        strict: true,
      }) ||
      !value.endsWith('000Z')
    ) {
      throw new ArgumentInvalidException('string is not in iso format ex. YYYY-MM-DDThh:mm:ss.000Z');
    }
  }
}
