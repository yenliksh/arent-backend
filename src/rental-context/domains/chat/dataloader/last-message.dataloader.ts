import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class LastMessageLoader implements NestDataLoader<MessageOrmEntity['id'], MessageOrmEntity | undefined> {
  generateDataLoader(): DataLoader<MessageOrmEntity['id'], MessageOrmEntity | undefined> {
    return new DataLoader<string, MessageOrmEntity | undefined>(async (chatIds) => {
      const chats = await ChatOrmEntity.query()
        .withGraphFetched({ lastMessage: true }, { joinOperation: 'leftJoin' })
        .findByIds(chatIds as string[]);

      return chatIds.map((id) => chats.find((chat) => chat.id === id)?.lastMessage);
    });
  }
}
