import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class FindLongTermRentAdRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'long term rent id' })
  readonly id: string;
}
