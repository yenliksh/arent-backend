import { ApartmentAdShortTermRentViewModel } from '@domains/apartment-ad/models/apartment-ad-short-term-rent.model';
import { ApartmentAdTimeIntervalModel } from '@domains/apartment-ad/models/sub-models/apartment-ad-postgres-interval.model';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { Field, ObjectType } from '@nestjs/graphql';

import { TimeInterval } from '../../types';

@ObjectType()
export class FindShortTermRentAdResponse {
  @Field(() => ApartmentAdShortTermRentViewModel)
  data: ApartmentAdShortTermRentViewModel;

  @Field(() => ApartmentAdTimeIntervalModel, { nullable: true })
  averageResponseOnRequest?: ApartmentAdTimeIntervalModel;

  static create = (data: ShortTermRentOrmEntity, averageResponseOnRequest?: TimeInterval) => {
    const payload = new FindShortTermRentAdResponse();

    payload.data = ApartmentAdShortTermRentViewModel.create(data);
    payload.averageResponseOnRequest = ApartmentAdTimeIntervalModel.create(averageResponseOnRequest);

    return payload;
  };
}
