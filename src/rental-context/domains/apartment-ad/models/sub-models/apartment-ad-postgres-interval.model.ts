import { TimeInterval } from '@domains/apartment-ad/types';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApartmentAdTimeIntervalModel {
  @Field(() => Number, { nullable: true })
  days?: number;

  @Field(() => Number, { nullable: true })
  hours?: number;

  @Field(() => Number, { nullable: true })
  minutes?: number;

  @Field(() => Number, { nullable: true })
  seconds?: number;

  @Field(() => Number, { nullable: true })
  milliseconds?: number;

  constructor(model: ApartmentAdTimeIntervalModel) {
    Object.assign(this, model);
  }

  static create(data?: TimeInterval) {
    return new ApartmentAdTimeIntervalModel({
      days: data?.days,
      hours: data?.hours,
      minutes: data?.minutes,
      seconds: data?.seconds,
      milliseconds: data?.milliseconds,
    });
  }
}
