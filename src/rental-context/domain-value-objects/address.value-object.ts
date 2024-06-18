import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { ArgumentInvalidException, ArgumentOutOfRangeException } from '@libs/exceptions';
import { TimezoneUtil } from '@libs/utils/timezone-util';
import { ApartmentAdGuard } from 'src/rental-context/domains/apartment-ad/domain/apartment-ad.guard';

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface AddressCreateProps {
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  region?: string;
  geoPoint: GeoPoint;
}

export interface AddressProps extends AddressCreateProps {
  timezone: string;
}

export class AddressVO extends ValueObject<AddressProps> {
  private constructor(value: AddressProps) {
    super(value);
  }

  static create(createProps: AddressCreateProps) {
    const { geoPoint: cords } = createProps;
    const props: AddressProps = { ...createProps, timezone: TimezoneUtil.getOffsetByCords(cords) };

    return new AddressVO(props);
  }

  get timezone() {
    return this.props.timezone;
  }

  unpackCreatedProps(): AddressCreateProps {
    return {
      city: this.props.city,
      country: this.props.country,
      geoPoint: this.props.geoPoint,
      houseNumber: this.props.houseNumber,
      street: this.props.street,
      region: this.props.region,
    };
  }

  protected validate(props: AddressProps): void {
    if (!Guard.lengthIsBetween(props.country, 1, 50)) {
      throw new ArgumentOutOfRangeException('Country is out of range');
    }
    if (!Guard.lengthIsBetween(props.city, 1, 100)) {
      throw new ArgumentOutOfRangeException('City is out of range');
    }
    if (props.region && !Guard.lengthIsBetween(props.region, 1, 100)) {
      throw new ArgumentOutOfRangeException('Region is out of range');
    }
    if (!Guard.lengthIsBetween(props.street, 1, 100)) {
      throw new ArgumentOutOfRangeException('Street is out of range');
    }
    if (!Guard.lengthIsBetween(props.houseNumber, 1, 50)) {
      throw new ArgumentOutOfRangeException('House number is out of range');
    }
    if (!ApartmentAdGuard.isLat(props.geoPoint.lat)) {
      throw new ArgumentInvalidException('Latitude number is invalid');
    }
    if (!ApartmentAdGuard.isLng(props.geoPoint.lng)) {
      throw new ArgumentInvalidException('Longitude number is invalid');
    }
  }

  static isNotEmpty(props: {
    country?: string;
    city?: string;
    region?: string;
    street?: string;
    houseNumber?: string;
    geoPoint: {
      lat?: number;
      lng?: number;
    };
    timezone?: string;
  }): AddressProps | undefined {
    if (
      props.country &&
      props.city &&
      props.street &&
      props.houseNumber &&
      props.geoPoint.lat != null &&
      props.geoPoint.lng != null &&
      props.timezone
    ) {
      return {
        country: props.country,
        city: props.city,
        region: props.region,
        street: props.street,
        houseNumber: props.houseNumber,
        geoPoint: {
          lat: props.geoPoint.lat,
          lng: props.geoPoint.lng,
        },
        timezone: props.timezone,
      };
    }

    return;
  }
}
