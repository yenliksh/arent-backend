import { AddressCreateProps, GeoPoint } from '@domain-value-objects/address.value-object';
import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GeoPointModel implements GeoPoint {
  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;

  static create(props: GeoPoint) {
    const payload = new GeoPointModel();
    Object.assign(payload, props);

    return payload;
  }
}

@ObjectType()
export class BaseContractAddressDataModel implements AddressCreateProps {
  @Field(() => String)
  country: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  street: string;

  @Field(() => String)
  houseNumber: string;

  @Field(() => String, { nullable: true })
  region?: string;

  @Field(() => GeoPointModel)
  geoPoint: GeoPointModel;

  static create(props: AddressCreateProps) {
    const payload = new BaseContractAddressDataModel();

    const assignObject: BaseContractAddressDataModel = {
      city: props.city,
      country: props.country,
      houseNumber: props.houseNumber,
      street: props.street,
      region: props.region,
      geoPoint: GeoPointModel.create({
        lat: props.geoPoint.lat,
        lng: props.geoPoint.lng,
      }),
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}
