import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class DeleteCardRequest {
  @IsUUID()
  @Field(() => String)
  readonly cardId: string;
}
