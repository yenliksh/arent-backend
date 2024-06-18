import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

import { UserComplaintType } from '../types';

interface CauseOfComplaintProps {
  type: UserComplaintType[];
  reason?: string | null;
}

export class UserComplaintVO extends ValueObject<CauseOfComplaintProps> {
  static create(type: UserComplaintType[], reason?: string | null) {
    return new UserComplaintVO({ type, reason });
  }

  protected validate({ type, reason }: CauseOfComplaintProps): void {
    for (const t of type) {
      if (!Guard.isValidEnum(t, UserComplaintType)) {
        throw new ArgumentInvalidException('Unexpected cause of complaint type');
      }
    }

    if (type.includes(UserComplaintType.OTHER) && !reason) {
      throw new ArgumentInvalidException('UserComplaintType.OTHER must contain text');
    }

    if (!type.includes(UserComplaintType.OTHER) && reason) {
      throw new ArgumentInvalidException('Text must contain only in UserComplaintType.OTHER');
    }
  }
}
