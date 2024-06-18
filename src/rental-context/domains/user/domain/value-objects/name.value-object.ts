import { DomainPrimitive, ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentOutOfRangeException } from '@libs/exceptions';

export class NameVO extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = NameVO.format(value);
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIsBetween(value, 1, 200)) {
      throw new ArgumentOutOfRangeException('Name must be a range from 1 to 200');
    }
  }

  static format(name: string): string {
    const trimmedName = name.trim();
    return trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1);
  }
}
