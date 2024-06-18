import { Field, InputType, Int } from '@nestjs/graphql';
import { IsDefined, IsPositive } from 'class-validator';

@InputType()
export class BaseOffsetPaginationRequest {
  @IsDefined()
  @IsPositive()
  @Field(() => Int)
  limit: number;

  @IsDefined()
  @IsPositive()
  @Field(() => Int)
  page: number;
}
