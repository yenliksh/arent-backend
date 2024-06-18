import { BaseAfterCursorPaginateRequest } from '@infrastructure/inputs/base-cursor-pagination.request.dto';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserChatRole } from 'src/rental-context/domains/chat/domain/types';

@InputType()
export class MyChatsRequest extends BaseAfterCursorPaginateRequest {
  @IsDefined()
  @IsEnum(UserChatRole)
  @Field(() => UserChatRole)
  readonly role: UserChatRole;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly filter?: string;
}
