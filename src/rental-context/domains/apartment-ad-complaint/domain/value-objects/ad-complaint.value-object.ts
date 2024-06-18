import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

import { AdComplaintType } from '../types';

interface CauseOfComplaintProps {
  type: AdComplaintType[];
  reason?: string | null;
}

export class AdComplaintVO extends ValueObject<CauseOfComplaintProps> {
  static create(type: AdComplaintType[], reason?: string | null) {
    return new AdComplaintVO({ type, reason });
  }

  protected validate({ type, reason }: CauseOfComplaintProps): void {
    for (const t of type) {
      if (!Guard.isValidEnum(t, AdComplaintType)) {
        throw new ArgumentInvalidException('Unexpected cause of complaint type');
      }
    }

    if (type.includes(AdComplaintType.OTHER) && !reason) {
      throw new ArgumentInvalidException('CauseOfComplaint.OTHER must contain text');
    }

    if (!type.includes(AdComplaintType.OTHER) && reason) {
      throw new ArgumentInvalidException('Text must contain only in CauseOfComplaint.OTHER');
    }
  }
}
