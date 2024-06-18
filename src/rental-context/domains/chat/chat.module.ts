import { RentalContextDomainRepositoriesModule } from '@domain-repositories/rental-context-domain-repositories.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateChatHandler } from './commands/create-chat/create-chat.handler';
import { UpdateLastMessageHandler } from './commands/update-last-message/update-last-message.handler';
import { UpdateLastOfferMessageHandler } from './commands/update-last-offer-message/update-last-offer-message.handler';
import { FindChatService } from './queries/find-chat/find-chat.service';
import { IsChatsExistService } from './queries/is-chats-exist/is-chats-exist.service';
import { MyChatsService } from './queries/my-chats/my-chats.service';
import { ChatQueryGraphqlResolver } from './resolvers/chat.query.resolver';
import { ChatGraphqlResolver } from './resolvers/chat.resolver';

const graphqlResolvers = [ChatGraphqlResolver, ChatQueryGraphqlResolver];

const commands = [UpdateLastMessageHandler, UpdateLastOfferMessageHandler, CreateChatHandler];

const queries = [MyChatsService, FindChatService, IsChatsExistService];

@Module({
  imports: [CqrsModule, RentalContextDomainRepositoriesModule],
  providers: [...graphqlResolvers, ...commands, ...queries],
})
export class ChatModule {}
