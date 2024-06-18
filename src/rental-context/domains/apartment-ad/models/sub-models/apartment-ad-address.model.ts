import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApartmentAdAddressModel {
  @Field(() => String)
  country: string;

  @Field(() => String)
  city: string;

  @Field(() => String, { nullable: true })
  region?: string;

  @Field(() => String)
  street: string;

  @Field(() => String)
  houseNumber: string;

  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;

  constructor(model: ApartmentAdAddressModel) {
    Object.assign(this, model);
  }

  static create(props: ApartmentAdAddressModel) {
    return new ApartmentAdAddressModel(props);
  }

  static getAddressProps({
    country,
    city,
    street,
    region,
    houseNumber,
    lat,
    lng,
  }: Partial<ApartmentAdAddressModel>): ApartmentAdAddressModel | undefined {
    if (!country || !city || !street || !houseNumber || !lat || !lng) {
      return;
    }

    return {
      country,
      city,
      region,
      street,
      houseNumber,
      lat,
      lng,
    };
  }
}
