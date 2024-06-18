import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { BaseAfterCursorPaginationResponse } from '@infrastructure/dto/base-cursor-pagination.response';
import { PaginationResult } from '@libs/utils/cursor-paginator';
import { Field, ObjectType } from '@nestjs/graphql';

import { ChatModel } from '../models/chat.model';

@ObjectType()
export class ChatPaginationResponse extends BaseAfterCursorPaginationResponse(ChatModel) {
  @Field(() => Boolean)
  isChatsExist: boolean;

  static create(props: PaginationResult<ChatOrmEntity>, isChatsExist: boolean) {
    const payload = new ChatPaginationResponse();

    payload.data = props.data.map(ChatModel.create);
    payload.pageInfo = props.pageInfo;
    payload.isChatsExist = isChatsExist;

    return payload;
  }
}
