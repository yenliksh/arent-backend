import { ShortTermRentLockedDateOrmEntity } from '@infrastructure/database/entities/short-term-rent-locked-dates.orm-entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApartmentAdLockedDatesModel {
  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;

  constructor(model: ApartmentAdLockedDatesModel) {
    Object.assign(this, model);
  }

  static create({ startDate, endDate }: ShortTermRentLockedDateOrmEntity) {
    return new ApartmentAdLockedDatesModel({
      startDate: startDate,
      endDate: endDate,
    });
  }
}
