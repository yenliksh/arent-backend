import { BaseBeforeCursorPaginateRequest } from '@infrastructure/inputs/base-cursor-pagination.request.dto';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class ChatMessagesRequest extends BaseBeforeCursorPaginateRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String)
  readonly chatId: string;
}
