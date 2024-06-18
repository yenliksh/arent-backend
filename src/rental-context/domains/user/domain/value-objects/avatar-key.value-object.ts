import { DomainPrimitive, ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';

export class AvatarKeyVO extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
    this.props.value = AvatarKeyVO.format(value);
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (Guard.isEmpty(value)) {
      throw new Error('Provided value is empty');
    }
    // TODO: add validation for avatar key
  }

  static format(avatarKey: string): string {
    return avatarKey.trim();
  }
}
