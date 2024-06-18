import { ChatMemberOrmEntity } from '@infrastructure/database/entities/chat-member.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class ChatMembersLoader implements NestDataLoader<UserOrmEntity['id'], UserOrmEntity[]> {
  generateDataLoader(): DataLoader<UserOrmEntity['id'], UserOrmEntity[]> {
    return new DataLoader<string, UserOrmEntity[]>(async (chatIds) => {
      const chatMembersSubQuery = ChatMemberOrmEntity.query().whereIn('chatId', chatIds as string[]);
      const members = await ChatMemberOrmEntity.relatedQuery('user')
        .for(chatMembersSubQuery)
        .withGraphFetched({ chatMembers: true })
        .modifyGraph('chatMembers', (builder) => {
          builder.whereIn('chatId', chatIds as string[]);
        });

      return chatIds.map((id) =>
        members.filter((member) => member.chatMembers?.some((chatMember) => chatMember.chatId === id)),
      );
    });
  }
}
