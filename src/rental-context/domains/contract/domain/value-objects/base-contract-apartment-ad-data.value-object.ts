import { AddressCreateProps } from '@domain-value-objects/address.value-object';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { ArgumentInvalidException } from '@libs/exceptions';
import { TimezoneUtil } from '@libs/utils/timezone-util';

export interface IBaseApartmentAdData {
  title: string;
  address: AddressCreateProps;
}

// TODO: update if apartment ad updated
export class BaseContractApartmentAdDataVO extends ValueObject<IBaseApartmentAdData> {
  constructor(props: IBaseApartmentAdData) {
    super(props);
  }

  get timezone() {
    return TimezoneUtil.getOffsetByCords({
      lat: this.props.address.geoPoint.lat,
      lng: this.props.address.geoPoint.lng,
    });
  }

  protected validate(props: IBaseApartmentAdData): void {
    const { title } = props;
    const { city, country, geoPoint, houseNumber, street } = props.address;

    const fields = [title, city, country, geoPoint, houseNumber, street];

    if (fields.some((f) => f == null)) {
      throw new ArgumentInvalidException(
        'Base apartment ad data for contract must to have complete all required fields',
      );
    }
  }
}
