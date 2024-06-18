import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class FindShortTermRentAdRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'short term rent id' })
  readonly id: string;
}
