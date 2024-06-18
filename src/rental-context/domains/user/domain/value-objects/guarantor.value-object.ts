import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException, ArgumentOutOfRangeException } from '@libs/exceptions';

import { UserGuard } from '../user.guard';

export interface GuarantorProps {
  phone: string;
  firstName: string;
  lastName: string;
}

export class GuarantorVO extends ValueObject<GuarantorProps> {
  constructor({ phone, firstName, lastName }: GuarantorProps) {
    super({ phone, firstName, lastName });
  }

  protected validate(props: GuarantorProps): void {
    const { phone, firstName, lastName } = props;

    const fields = [phone, firstName, lastName];

    if (fields.some((f) => f == null)) {
      throw new ArgumentInvalidException('Guarantor must to complete all required fields');
    }

    if (!Guard.lengthIsBetween(phone, 8, 16)) {
      throw new ArgumentOutOfRangeException('Phone number length out of the range');
    }

    if (!UserGuard.isPhoneNumber(phone)) {
      throw new ArgumentInvalidException('Phone number has incorrect format');
    }

    if (!Guard.lengthIsBetween(firstName, 1, 100)) {
      throw new ArgumentOutOfRangeException('First name must be a range from 1 to 100');
    }

    if (!Guard.lengthIsBetween(lastName, 1, 100)) {
      throw new ArgumentOutOfRangeException('Last name must be a range from 1 to 100');
    }
  }
}
