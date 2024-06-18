import { UserChatRole } from '@domains/chat/domain/types';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from 'class-validator';

@InputType()
export class isChatsExistRequest {
  @IsDefined()
  @IsEnum(UserChatRole)
  @Field(() => UserChatRole)
  readonly role: UserChatRole;
}
