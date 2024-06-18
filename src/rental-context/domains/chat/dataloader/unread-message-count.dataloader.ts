import { ChatMemberOrmEntity } from '@infrastructure/database/entities/chat-member.orm-entity';
import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import { decodeBase64 } from '@libs/utils/base64';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

export interface UnreadMessageCountLoaderProps {
  chatId: string;
  userId: string;
}

@Injectable()
export class UnreadMessageCountLoader implements NestDataLoader<MessageOrmEntity['id'], number | undefined> {
  generateDataLoader(): DataLoader<MessageOrmEntity['id'], number | undefined> {
    return new DataLoader<string, number | undefined>(async (base64Props) => {
      const props = base64Props.map(decodeBase64<UnreadMessageCountLoaderProps>);

      const lastReadMessagesQb = ChatMemberOrmEntity.query()
        .withGraphFetched({ lastReadMessage: true }, { joinOperation: 'leftJoin' })
        .modifyGraph('lastReadMessage', (builder) => builder.select('createdAt'));

      props.map((prop) => lastReadMessagesQb.orWhere({ chatId: prop.chatId, memberId: prop.userId }));

      const chatMembers = await lastReadMessagesQb;

      const messagesQb = MessageOrmEntity.query()
        .groupBy('chatId')
        .orderByRaw(`MAX("createdAt") DESC`)
        .count()
        .select('chatId');

      chatMembers.map((member) =>
        messagesQb.orWhere((builder) => {
          const createdAt = member.lastReadMessage?.createdAt.toISOString();

          builder.where({ chatId: member.chatId });

          if (createdAt) {
            builder.where((builder) => {
              builder.whereRaw(`${MessageOrmEntity.tableName}."createdAt"::timestamptz > '${createdAt}'::timestamptz`);
            });
          }
        }),
      );

      const unreadMessages = (await messagesQb) as unknown as { count: string; chatId: string }[];

      return base64Props.map((base64Prop) => {
        const { chatId } = decodeBase64<UnreadMessageCountLoaderProps>(base64Prop);

        const count = unreadMessages.find((message) => message.chatId === chatId)?.count;

        return count ? Number(count) : undefined;
      });
    });
  }
}
