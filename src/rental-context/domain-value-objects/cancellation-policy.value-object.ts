import {
  ApartmentRentPeriodType,
  LongTermRentCancellationPolicyType,
  ShortTermRentCancellationPolicyType,
} from '@infrastructure/enums';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface CancellationPolicyProps {
  shortTermCancellationPolicy?: ShortTermRentCancellationPolicyType;
  longTermCancellationPolicy?: LongTermRentCancellationPolicyType;
}

export type CancellationPolicyCreateProps = CancellationPolicyProps;

export class CancellationPolicyVO extends ValueObject<CancellationPolicyProps> {
  static create(
    apartmentRentPeriodType: ApartmentRentPeriodType,
    { shortTermCancellationPolicy, longTermCancellationPolicy }: CancellationPolicyCreateProps,
  ) {
    const props: CancellationPolicyCreateProps = {
      shortTermCancellationPolicy:
        apartmentRentPeriodType === ApartmentRentPeriodType.SHORT_TERM ? shortTermCancellationPolicy : undefined,
      longTermCancellationPolicy:
        apartmentRentPeriodType === ApartmentRentPeriodType.LONG_TERM ? longTermCancellationPolicy : undefined,
    };

    return new CancellationPolicyVO(props);
  }

  get shortTermCancellationPolicy() {
    return this.props.shortTermCancellationPolicy;
  }

  get longTermCancellationPolicy() {
    return this.props.longTermCancellationPolicy;
  }

  protected validate(props: CancellationPolicyProps): void {
    const { shortTermCancellationPolicy, longTermCancellationPolicy } = props;

    if (shortTermCancellationPolicy && longTermCancellationPolicy) {
      throw new ArgumentInvalidException('Cancellation policy required only for one rent term');
    }
    if (!shortTermCancellationPolicy && !longTermCancellationPolicy) {
      throw new ArgumentInvalidException('Cancellation policy required');
    }
  }
}
