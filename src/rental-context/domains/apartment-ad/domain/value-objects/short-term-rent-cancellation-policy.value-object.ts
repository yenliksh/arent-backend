import { ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface ShortTermRentCancellationPolicyProps {
  value: ShortTermRentCancellationPolicyType;
}

export class ShortTermRentCancellationPolicyVO extends ValueObject<ShortTermRentCancellationPolicyProps> {
  static create(type: ShortTermRentCancellationPolicyType) {
    return new ShortTermRentCancellationPolicyVO({ value: type });
  }

  get value() {
    return this.props.value;
  }

  protected validate(props: ShortTermRentCancellationPolicyProps): void {
    if (!Guard.isValidEnum(props.value, ShortTermRentCancellationPolicyType)) {
      throw new ArgumentInvalidException('Short term rent cancellation policy type is not valid');
    }
  }
}
