import { DomainPrimitive, ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentOutOfRangeException } from '@libs/exceptions';

export class RejectReasonVO extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = RejectReasonVO.format(value);
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIsBetween(value, 1, 500)) {
      throw new ArgumentOutOfRangeException('Reason must be a range from 1 to 500');
    }
  }

  static format(value: string): string {
    const trimmedValue = value.trim();
    return trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1);
  }
}
