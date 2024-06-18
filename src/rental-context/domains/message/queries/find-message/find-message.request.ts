import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class FindMessageRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'message id' })
  readonly id: string;
}
