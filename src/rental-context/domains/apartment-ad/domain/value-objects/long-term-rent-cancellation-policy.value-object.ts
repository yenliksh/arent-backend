import { LongTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface LongTermRentCancellationPolicyProps {
  value: LongTermRentCancellationPolicyType;
}

export class LongTermRentCancellationPolicyVO extends ValueObject<LongTermRentCancellationPolicyProps> {
  static create(type: LongTermRentCancellationPolicyType) {
    return new LongTermRentCancellationPolicyVO({ value: type });
  }

  get value() {
    return this.props.value;
  }

  protected validate(props: LongTermRentCancellationPolicyProps): void {
    if (!Guard.isValidEnum(props.value, LongTermRentCancellationPolicyType)) {
      throw new ArgumentInvalidException('Long term rent cancellation policy type is not valid');
    }
  }
}
