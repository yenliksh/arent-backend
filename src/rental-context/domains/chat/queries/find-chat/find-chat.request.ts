import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class FindChatRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'chatId' })
  readonly id: string;
}
