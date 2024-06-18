import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageAfterCursorInfo {
  @Field()
  perPage: number;

  @Field()
  count: number;

  @Field(() => String, { nullable: true })
  afterCursor: string | null;
}

@ObjectType()
export class PageBeforeCursorInfo {
  @Field()
  perPage: number;

  @Field()
  count: number;

  @Field(() => String, { nullable: true })
  beforeCursor: string | null;
}
