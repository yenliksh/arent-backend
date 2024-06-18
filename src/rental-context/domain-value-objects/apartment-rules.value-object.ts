import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';

import { ApartmentAdHasEmptyFieldsError } from '../domains/apartment-ad/domain/errors/apartment-ad.errors';

export interface ApartmentRulesProps {
  allowedWithPets: boolean | null;
  allowedWithChildren: boolean | null;
  allowedToSmoke: boolean | null;
  allowedToHangingOut: boolean | null;
}

export class ApartmentRulesVO extends ValueObject<ApartmentRulesProps> {
  private constructor(props: ApartmentRulesProps) {
    super(props);
  }

  static create(props: ApartmentRulesProps) {
    return new ApartmentRulesVO(props);
  }

  protected validate(props: ApartmentRulesProps): void {
    const { allowedToHangingOut, allowedToSmoke, allowedWithChildren, allowedWithPets } = props;

    const fields = [allowedToHangingOut, allowedToSmoke, allowedWithChildren, allowedWithPets];

    if (fields.some((f) => f == null)) {
      throw new ApartmentAdHasEmptyFieldsError('Apartment ad important info must have all required fields');
    }
  }
}
