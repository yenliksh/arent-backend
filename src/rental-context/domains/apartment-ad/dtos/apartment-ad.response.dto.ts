import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { Field, ObjectType } from '@nestjs/graphql';

import { ApartmentAdModel } from '../models/apartment-ad.model';

@ObjectType()
export class ApartmentAdResponse {
  @Field(() => ApartmentAdModel)
  apartmentAd: ApartmentAdModel;

  static create(props: ApartmentAdOrmEntity) {
    const payload = new ApartmentAdResponse();

    payload.apartmentAd = ApartmentAdModel.create(props);

    return payload;
  }
}
