import { ProblemTypes } from '@libs/problems/types';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProblemBase {
  @Field(() => String)
  public message: ProblemTypes;

  constructor(msg: ProblemTypes) {
    this.message = msg;
  }
}
