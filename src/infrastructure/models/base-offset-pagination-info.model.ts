import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseOffsetPaginationInfoModel {
  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  limit: number;
}
