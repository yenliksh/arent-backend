import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { ArgumentInvalidException } from '@libs/exceptions';

import { ApartmentAdGuard } from '../apartment-ad.guard';

interface ArrivalAndDepartureTimeCreateProps {
  arrivalTime: string;
  departureTime: string; //TODO: make enum for reasons
}

export type ArrivalAndDepartureTimeProps = ArrivalAndDepartureTimeCreateProps;

export class ArrivalAndDepartureTimeVO extends ValueObject<ArrivalAndDepartureTimeProps> {
  static create({ arrivalTime, departureTime }: ArrivalAndDepartureTimeCreateProps) {
    return new ArrivalAndDepartureTimeVO({
      arrivalTime,
      departureTime,
    });
  }

  get arrivalTime() {
    return this.props.arrivalTime;
  }

  get departureTime() {
    return this.props.departureTime;
  }

  protected validate(props: ArrivalAndDepartureTimeProps): void {
    const { arrivalTime, departureTime } = props;

    if (!ApartmentAdGuard.isArrivalOrDepartureTime(arrivalTime)) {
      throw new ArgumentInvalidException('Unexpected arrival time');
    }

    if (!ApartmentAdGuard.isArrivalOrDepartureTime(departureTime)) {
      throw new ArgumentInvalidException('Unexpected departure time');
    }
  }
}
