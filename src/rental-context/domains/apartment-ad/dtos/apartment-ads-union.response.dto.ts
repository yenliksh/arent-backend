import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { Field, ObjectType } from '@nestjs/graphql';

import { ApartmentAdLongTermRentModel } from '../models/apartment-ad-long-term-rent.model';
import { ApartmentAdShortTermRentModel } from '../models/apartment-ad-short-term-rent.model';

@ObjectType()
export class ApartmentAdsUnionResponse {
  @Field(() => [ApartmentAdShortTermRentModel])
  apartmentAdShortTermRent: ApartmentAdShortTermRentModel[];

  @Field(() => [ApartmentAdLongTermRentModel])
  apartmentAdLongTermRent: ApartmentAdLongTermRentModel[];

  static create([shortRent, longRent]: [ShortTermRentOrmEntity[], LongTermRentOrmEntity[]]) {
    const payload = new ApartmentAdsUnionResponse();

    payload.apartmentAdShortTermRent = shortRent.map(ApartmentAdShortTermRentModel.create);
    payload.apartmentAdLongTermRent = longRent.map(ApartmentAdLongTermRentModel.create);

    return payload;
  }
}
