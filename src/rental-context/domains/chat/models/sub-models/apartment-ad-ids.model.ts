import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApartmentAdIdsModel {
  @Field(() => String, { nullable: true })
  shortTermRentId?: string;

  @Field(() => String, { nullable: true })
  longTermRentId?: string;

  constructor(model: ApartmentAdIdsModel) {
    Object.assign(this, model);
  }

  static create(props: ApartmentAdIdsModel) {
    return new ApartmentAdIdsModel(props);
  }
}
