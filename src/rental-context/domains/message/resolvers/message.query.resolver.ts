import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { MessagePaginationResponse } from '../dtos/message-pagination.response.dto';
import { ChatMessagesRequest } from '../queries/chat-messages/chat-messages.request.dto';
import { ChatMessagesService } from '../queries/chat-messages/chat-messages.service';

@Resolver()
export class MessageQueryGraphqlResolver {
  constructor(private readonly chatMessagesService: ChatMessagesService) {}

  @UseGuards(JwtAuthGuard())
  @Query(() => MessagePaginationResponse, { name: 'chat__messages' })
  async getChatMessages(
    @IAM() iam: UserOrmEntity,
    @Args('input') input: ChatMessagesRequest,
  ): Promise<MessagePaginationResponse> {
    const result = await this.chatMessagesService.handle(input, iam.id);

    return MessagePaginationResponse.create(result.unwrap());
  }
}
