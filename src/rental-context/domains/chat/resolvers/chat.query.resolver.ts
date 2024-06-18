import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ChatPaginationResponse } from '../dtos/chat-pagination.response';
import { ChatModel } from '../models/chat.model';
import { FindChatRequest } from '../queries/find-chat/find-chat.request';
import { FindChatService } from '../queries/find-chat/find-chat.service';
import { IsChatsExistService } from '../queries/is-chats-exist/is-chats-exist.service';
import { MyChatsRequest } from '../queries/my-chats/my-chats.request.dto';
import { MyChatsService } from '../queries/my-chats/my-chats.service';

@Resolver()
export class ChatQueryGraphqlResolver {
  constructor(
    private readonly myChatsService: MyChatsService,
    private readonly findChatService: FindChatService,
    private readonly isChatsExistService: IsChatsExistService,
  ) {}

  @UseGuards(JwtAuthGuard())
  @Query(() => ChatPaginationResponse, { name: 'chat__myChats' })
  async myChats(@IAM() iam: UserOrmEntity, @Args('input') input: MyChatsRequest): Promise<ChatPaginationResponse> {
    const [result, isChatsExist] = await Promise.all([
      this.myChatsService.handle(iam.id, input),
      this.isChatsExistService.handle(iam.id, input),
    ]);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return ChatPaginationResponse.create(result.unwrap(), isChatsExist.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Query(() => ChatModel, { name: 'chat__byId' })
  async chatById(@IAM() iam: UserOrmEntity, @Args('input') input: FindChatRequest): Promise<ChatModel> {
    const result = await this.findChatService.handle(input, iam.id);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return ChatModel.create(result.unwrap());
  }
}
