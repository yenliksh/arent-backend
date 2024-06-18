import { ApartmentAdModel } from '@domains/apartment-ad/models/apartment-ad.model';
import { LongTermRentIsRentedProblem } from '@domains/apartment-ad/problems/long-term-rent-is-rented.problem';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PublishApartmentAdResponse extends ProblemResponse {
  @Field(() => ApartmentAdModel, { nullable: true })
  apartmentAd?: ApartmentAdModel;

  @Field(() => LongTermRentIsRentedProblem, { nullable: true })
  problem?: LongTermRentIsRentedProblem;

  static create(props: ApartmentAdOrmEntity) {
    const payload = new PublishApartmentAdResponse();

    payload.apartmentAd = ApartmentAdModel.create(props);

    return payload;
  }
}
