import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface ApartmentAdDescriptionProps {
  name: string;
  description?: string;
  remoteView?: boolean;
  selfCheckIn?: boolean;
  freeParking?: boolean;
  workSpace?: boolean;
  quite?: boolean;
  forFamily?: boolean;
}

export class ApartmentAdDescriptionVO extends ValueObject<ApartmentAdDescriptionProps> {
  private constructor(props: ApartmentAdDescriptionProps) {
    super(props);
  }

  static create({
    name,
    description,
    remoteView,
    selfCheckIn,
    freeParking,
    workSpace,
    quite,
    forFamily,
  }: ApartmentAdDescriptionProps) {
    return new ApartmentAdDescriptionVO({
      name,
      description,
      remoteView,
      selfCheckIn,
      freeParking,
      workSpace,
      quite,
      forFamily,
    });
  }

  protected validate(props: ApartmentAdDescriptionProps): void {
    const { name, description } = props;

    if (!Guard.lengthIsBetween(name, 1, 300)) {
      throw new ArgumentInvalidException('Name must be in a range between 1 and 300');
    }

    if (description && !Guard.lengthIsBetween(description, 1, 2000)) {
      throw new ArgumentInvalidException('Description must be in a range between 1 and 2000');
    }
  }
}
