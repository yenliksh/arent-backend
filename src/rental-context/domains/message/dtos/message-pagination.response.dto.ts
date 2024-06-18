import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { BaseBeforeCursorPaginationResponse } from '@infrastructure/dto/base-cursor-pagination.response';
import { PaginationResult } from '@libs/utils/cursor-paginator';
import { ObjectType } from '@nestjs/graphql';

import { MessageModel } from '../models/message.model';

@ObjectType('MessagePayload')
export class MessagePaginationResponse extends BaseBeforeCursorPaginationResponse(MessageModel) {
  static create(props: PaginationResult<MessageOrmEntity>) {
    const payload = new MessagePaginationResponse();

    payload.data = props.data.map(MessageModel.create);
    payload.pageInfo = props.pageInfo;

    return payload;
  }
}
