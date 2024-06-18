import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class FindMyCardRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'innopayCard' })
  readonly id: string;
}
