import { ChatMemberOrmEntity } from '@infrastructure/database/entities/chat-member.orm-entity';
import { Injectable } from '@nestjs/common';
import { Ok } from 'oxide.ts';

import { isChatsExistRequest } from './is-chats-exist.request.dto';

@Injectable()
export class IsChatsExistService {
  async handle(userId: string, input: isChatsExistRequest): Promise<Ok<boolean>> {
    const { role } = input;

    const filterChatMemberSubQuery = ChatMemberOrmEntity.query().where({ memberId: userId, role });

    const chat = await ChatMemberOrmEntity.relatedQuery('chat').for(filterChatMemberSubQuery).limit(1).first();

    return Ok(!!chat);
  }
}
