import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { PubSubService, PubSubTrigger } from '@modules/graphql-subscriptions/pub-sub.service';
import { MessagePubSubPayload, MessagePubSubResPayload } from '@modules/graphql-subscriptions/types';
import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { UserChatRole } from 'src/rental-context/domains/chat/domain/types';

import { MessageModel } from '../models/message.model';

@Resolver()
export class MessageSubscriptionResolver {
  constructor(private readonly pubSubService: PubSubService) {}

  @Subscription(() => MessageModel, {
    name: PubSubTrigger.NEW_MESSAGE,
    filter: (payload: MessagePubSubPayload, variables, context) =>
      payload.chatMembers[context.user.id] === variables.userChatRole,
    resolve: async (payload: MessagePubSubResPayload) => {
      const ormEntity: MessageOrmEntity = {
        ...payload.message,
        contractData: payload.message.contractData
          ? {
              ...payload.message.contractData,
              transactionsMeta: payload.message.contractData.transactionsMeta?.map((meta) => ({
                ...meta,
                startDate: meta.startDate.toISOString(),
                endDate: meta.endDate.toISOString(),
                withdrawFundsDate: meta.withdrawFundsDate.toISOString(),
              })),
            }
          : undefined,
      };

      return MessageModel.create(ormEntity);
    },
  })
  newMessage(@Args('userChatRole', { type: () => UserChatRole }) _userChatRole: UserChatRole) {
    return this.pubSubService.asyncIterator(PubSubTrigger.NEW_MESSAGE);
  }
}
