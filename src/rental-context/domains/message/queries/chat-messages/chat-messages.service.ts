import { ChatMemberOrmEntity } from '@infrastructure/database/entities/chat-member.orm-entity';
import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { PaginationResult, decodeCursor, getDataWithBeforeCursor } from '@libs/utils/cursor-paginator';
import { Injectable } from '@nestjs/common';
import { Ok } from 'oxide.ts';
import { MessageCursorType } from 'src/rental-context/domains/message/domain/types';

import { ChatMessagesRequest } from './chat-messages.request.dto';

@Injectable()
export class ChatMessagesService {
  async handle(dto: ChatMessagesRequest, userId: UserOrmEntity['id']): Promise<Ok<PaginationResult<MessageOrmEntity>>> {
    const { chatId, beforeCursor, limit = 20 } = dto;
    const cursorBefore: MessageCursorType | undefined = beforeCursor
      ? decodeCursor<MessageCursorType>(beforeCursor)
      : undefined;

    const chatMemberSubQuery = ChatMemberOrmEntity.query().where({ memberId: userId });
    const chatSubQuery = ChatMemberOrmEntity.relatedQuery('chat').for(chatMemberSubQuery).findById(chatId);
    const messageQb = ChatOrmEntity.relatedQuery('messages')
      .for(chatSubQuery)
      .limit(limit + 1)
      .orderBy([
        { column: 'createdAt', order: 'DESC' },
        {
          column: 'id',
          order: 'DESC',
        },
      ]);

    if (cursorBefore) {
      messageQb.andWhere((builder) => {
        builder
          .whereRaw(`${MessageOrmEntity.tableName}."createdAt"::timestamptz < '${cursorBefore.createdAt}'::timestamptz`)
          .orWhereRaw(
            `${MessageOrmEntity.tableName}."createdAt"::timestamptz = '${cursorBefore.createdAt}'::timestamptz
            AND ${MessageOrmEntity.tableName}."id" < '${cursorBefore.id}'`,
          );
      });
    }

    const messages = await messageQb;

    const returningData = getDataWithBeforeCursor<MessageOrmEntity, MessageOrmEntity>(messages, limit, (i) => i, null, [
      'id',
      'createdAt',
    ]);

    return Ok(returningData);
  }
}
