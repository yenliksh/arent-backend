import { RentalContextDomainRepositoriesModule } from '@domain-repositories/rental-context-domain-repositories.module';
import { ContractBullsModule } from '@domains/contract/bulls/contract-bulls.module';
import { GraphqlSubscriptionsModule } from '@modules/graphql-subscriptions/graphql-subscriptions.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { MarkMessageAsReadHandler } from './commands/mark-message-as-read/mark-message-as-read.handler';
import { PushSystemMessageHandler } from './commands/push-system-message/push-system-message.handler';
import { SendMessageHandler } from './commands/send-message/send-message.handler';
import { ChatMessagesService } from './queries/chat-messages/chat-messages.service';
import { FindMessageService } from './queries/find-message/find-message.service';
import { MessageMutationGraphqlResolver } from './resolvers/message.mutation.resolver';
import { MessageQueryGraphqlResolver } from './resolvers/message.query.resolver';
import { MessageGraphqlResolver } from './resolvers/message.resolver';
import { MessageSubscriptionResolver } from './resolvers/message.subscription.resolver';

const graphqlResolvers = [
  MessageMutationGraphqlResolver,
  MessageQueryGraphqlResolver,
  MessageSubscriptionResolver,
  MessageGraphqlResolver,
];

const commands = [SendMessageHandler, MarkMessageAsReadHandler, PushSystemMessageHandler];

const queries = [ChatMessagesService, FindMessageService];

@Module({
  imports: [CqrsModule, GraphqlSubscriptionsModule, RentalContextDomainRepositoriesModule, ContractBullsModule],
  providers: [...graphqlResolvers, ...commands, ...queries],
})
export class MessageModule {}
