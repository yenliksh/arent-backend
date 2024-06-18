import { ApartmentType, CurrencyType } from '@domains/apartment-ad/domain/types';
import { LongTermRentDocumentProps } from '@infrastructure/elastic-search/documents/long-term-rent.document';
import { ShortTermRentDocumentProps } from '@infrastructure/elastic-search/documents/short-term-rent.document';
import { prependDomainUrlToFileKey } from '@libs/utils/file-key.helper';
import { toMinorUnitString } from '@libs/utils/minimal-unit.helper';
import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApartmentAdClusterModel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => ApartmentType)
  apartmentType: ApartmentType;

  @Field(() => String)
  photo: string;

  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;

  @Field(() => String)
  cost: string;

  @Field(() => CurrencyType, { defaultValue: CurrencyType.KZT, description: 'does not need specify in MPV' })
  currency: CurrencyType;

  static create(props: LongTermRentDocumentProps | ShortTermRentDocumentProps) {
    const payload = new ApartmentAdClusterModel();

    const photo = props.photo;
    const title = props.title;

    const assignObject: ApartmentAdClusterModel = {
      id: props.id,
      title,
      apartmentType: props.apartmentType,
      photo: prependDomainUrlToFileKey(photo),
      cost: toMinorUnitString(props.cost),
      currency: props.currency,
      lat: props.geoPoint.lat,
      lng: props.geoPoint.lon,
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}
