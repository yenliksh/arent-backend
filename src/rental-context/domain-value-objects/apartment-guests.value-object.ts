import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException } from '@libs/exceptions';

export interface IGuests {
  numberOfChildren: number;
  numberOfAdult: number;
  numberOfPets: number;
}

export interface ApartmentGuestsCreateProps {
  numberOfChildren?: number;
  numberOfAdult?: number;
  numberOfPets?: number;
}

export class ApartmentGuestsVO extends ValueObject<IGuests> {
  constructor(props: IGuests) {
    super(props);
  }

  static create(props: ApartmentGuestsCreateProps) {
    const transformedProps = ApartmentGuestsVO.transform(props);
    return new ApartmentGuestsVO(transformedProps);
  }

  protected validate(props: IGuests): void {
    const { numberOfAdult, numberOfChildren, numberOfPets } = props;
    if (Guard.isNegative(numberOfAdult) || Guard.isNegative(numberOfChildren) || Guard.isNegative(numberOfPets)) {
      throw new ArgumentInvalidException('Number must be more than 0');
    }
  }

  static transform(props: ApartmentGuestsCreateProps): IGuests {
    const { numberOfAdult, numberOfChildren, numberOfPets } = props;

    return {
      numberOfAdult: numberOfAdult ?? 0,
      numberOfChildren: numberOfChildren ?? 0,
      numberOfPets: numberOfPets ?? 0,
    };
  }
}
