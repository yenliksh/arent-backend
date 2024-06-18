import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException, ArgumentOutOfRangeException } from '@libs/exceptions';

import { ApartmentAdGuard } from '../apartment-ad.guard';

export interface ApartmentAdDetailsProps {
  numberOfRooms: number;
  numberOfGuests: number;
}

export class ApartmentAdDetailsVO extends ValueObject<ApartmentAdDetailsProps> {
  private constructor(props: ApartmentAdDetailsProps) {
    super(props);
  }

  static create({ numberOfGuests, numberOfRooms }: ApartmentAdDetailsProps) {
    return new ApartmentAdDetailsVO({
      numberOfGuests,
      numberOfRooms,
    });
  }

  get numberOfGuests() {
    return this.props.numberOfGuests;
  }

  protected validate(props: ApartmentAdDetailsProps): void {
    if (props.numberOfGuests && !Guard.isPositiveNumber(props.numberOfGuests)) {
      throw new ArgumentInvalidException('Number of guests is negative');
    }

    if (props.numberOfRooms && Guard.isNegative(props.numberOfRooms)) {
      throw new ArgumentInvalidException('Number of rooms is negative');
    }

    if (props.numberOfRooms && !ApartmentAdGuard.isNumberOfRooms(props.numberOfRooms)) {
      throw new ArgumentOutOfRangeException('Number of rooms is out of range');
    }
  }
}
