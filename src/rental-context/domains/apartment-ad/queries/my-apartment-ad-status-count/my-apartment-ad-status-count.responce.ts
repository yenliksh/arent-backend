import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApartmentAdStatusType } from 'src/rental-context/domains/apartment-ad/domain/types';

@ObjectType()
export class MyApartmentAdStatusCountResponse {
  @Field(() => Int)
  readonly [ApartmentAdStatusType.ACTIVE]: number;
  @Field(() => Int)
  readonly [ApartmentAdStatusType.DRAFT]: number;
  @Field(() => Int)
  readonly [ApartmentAdStatusType.PAUSED]: number;
  @Field(() => Int)
  readonly [ApartmentAdStatusType.PROCESSING]: number;
  @Field(() => Int)
  readonly [ApartmentAdStatusType.PUBLISHED]: number;
}
