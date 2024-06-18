import { DomainPrimitive, ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException, ArgumentOutOfRangeException } from '@libs/exceptions';

import { UserGuard } from '../user.guard';

export class PhoneVO extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = PhoneVO.format(value);
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIsBetween(value, 8, 16)) {
      throw new ArgumentOutOfRangeException('Phone number length out of the range');
    }

    if (!UserGuard.isPhoneNumber(value)) {
      throw new ArgumentInvalidException('Phone number has incorrect format');
    }
  }

  static format(email: string): string {
    return email.trim();
  }
}
