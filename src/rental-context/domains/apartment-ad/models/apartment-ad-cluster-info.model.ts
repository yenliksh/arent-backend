import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApartmentAdClusterInfoModel {
  @Field(() => Int)
  totalItems: number;

  static create(props: ApartmentAdClusterInfoModel) {
    const payload = new ApartmentAdClusterInfoModel();

    Object.assign(payload, props);

    return payload;
  }
}
