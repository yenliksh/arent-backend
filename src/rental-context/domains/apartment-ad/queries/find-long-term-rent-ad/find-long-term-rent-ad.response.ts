import { ApartmentAdLongTermRentViewModel } from '@domains/apartment-ad/models/apartment-ad-long-term-rent.model';
import { ApartmentAdTimeIntervalModel } from '@domains/apartment-ad/models/sub-models/apartment-ad-postgres-interval.model';
import { TimeInterval } from '@domains/apartment-ad/types';
import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FindLongTermRentAdResponse {
  @Field(() => ApartmentAdLongTermRentViewModel)
  data: ApartmentAdLongTermRentViewModel;

  @Field(() => ApartmentAdTimeIntervalModel, { nullable: true })
  averageResponseOnRequest?: ApartmentAdTimeIntervalModel;

  static create = (data: LongTermRentOrmEntity, averageResponseOnRequest?: TimeInterval) => {
    const payload = new FindLongTermRentAdResponse();

    payload.data = ApartmentAdLongTermRentViewModel.create(data);
    payload.averageResponseOnRequest = ApartmentAdTimeIntervalModel.create(averageResponseOnRequest);

    return payload;
  };
}
