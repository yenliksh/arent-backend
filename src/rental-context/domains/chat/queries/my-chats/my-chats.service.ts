import { ChatMemberOrmEntity } from '@infrastructure/database/entities/chat-member.orm-entity';
import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { PaginationResult, decodeCursor, getDataWithAfterCursor } from '@libs/utils/cursor-paginator';
import { Injectable } from '@nestjs/common';
import { Ok } from 'oxide.ts';
import { ChatCursorType } from 'src/rental-context/domains/chat/domain/types';

import { MyChatsRequest } from './my-chats.request.dto';

@Injectable()
export class MyChatsService {
  async handle(userId: string, input: MyChatsRequest): Promise<Ok<PaginationResult<ChatOrmEntity>>> {
    const { role, filter, afterCursor, limit = 20 } = input;

    const cursorAfter: ChatCursorType | undefined = afterCursor ? decodeCursor<ChatCursorType>(afterCursor) : undefined;

    const filterChatMemberSubQuery = ChatMemberOrmEntity.query();

    if (filter) {
      filterChatMemberSubQuery
        .innerJoinRelated({ user: true })
        .whereNot({ memberId: userId })
        .where('firstName', 'ILIKE', `%${filter}%`);
    }

    const chatsQb = ChatMemberOrmEntity.relatedQuery('chat')
      .for(filterChatMemberSubQuery)
      .innerJoinRelated({ members: true })
      .whereRaw(`members."memberId" = '${userId}' AND members."role" = '${role}'`)
      .limit(limit + 1)
      .orderBy([
        { column: 'updatedAt', order: 'DESC' },
        { column: 'contractId', order: 'DESC' },
      ]);

    if (cursorAfter) {
      chatsQb.andWhere((builder) => {
        builder
          .whereRaw(`${ChatOrmEntity.tableName}."updatedAt"::timestamptz < '${cursorAfter.updatedAt}'::timestamptz`)
          .orWhereRaw(
            `(${ChatOrmEntity.tableName}."updatedAt"::timestamptz = '${cursorAfter.updatedAt}'::timestamptz)
            AND (${ChatOrmEntity.tableName}."contractId" < '${cursorAfter.contractId}')`,
          );
      });
    }

    const chats = await chatsQb;

    const returningData = getDataWithAfterCursor<ChatOrmEntity, ChatOrmEntity>(chats, limit, (i) => i, null, [
      'contractId',
      'updatedAt',
    ]);

    return Ok(returningData);
  }
}
