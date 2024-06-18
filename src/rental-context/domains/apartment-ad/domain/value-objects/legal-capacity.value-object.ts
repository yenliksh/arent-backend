import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

import { LegalCapacityType } from '../types';

export interface LegalCapacityProps {
  type: LegalCapacityType;
  tinBin?: string;
  companyName?: string;
  address?: string;
}

export class LegalCapacityVO extends ValueObject<LegalCapacityProps> {
  private constructor(props: LegalCapacityProps) {
    super(props);
  }

  static create({ type, tinBin, companyName, address }: LegalCapacityProps) {
    return new LegalCapacityVO({
      type,
      tinBin,
      companyName,
      address,
    });
  }

  protected validate(props: LegalCapacityProps): void {
    const { type, tinBin, companyName, address } = props;

    if (!Guard.isValidEnum(type, LegalCapacityType)) {
      throw new ArgumentInvalidException('Unexpected rent legal capacity type');
    }

    if (type === LegalCapacityType.LEGAL_ENTITY && (!tinBin || !companyName || !address)) {
      throw new ArgumentInvalidException('Legal capacity must have all required fields');
    }
  }
}
