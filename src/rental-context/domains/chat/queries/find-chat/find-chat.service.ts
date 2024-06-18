import { ChatMemberOrmEntity } from '@infrastructure/database/entities/chat-member.orm-entity';
import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';

import { FindChatRequest } from './find-chat.request';

@Injectable()
export class FindChatService {
  async handle(dto: FindChatRequest, userId: UserOrmEntity['id']): Promise<Result<ChatOrmEntity, HttpException>> {
    const { id } = dto;
    const chatMembersSubQuery = ChatMemberOrmEntity.query().where({ chatId: id, memberId: userId });

    const chat = await ChatMemberOrmEntity.relatedQuery('chat').for(chatMembersSubQuery).findById(id);

    if (!chat) {
      return Err(new NotFoundException('Chat not found'));
    }

    return Ok(chat);
  }
}
