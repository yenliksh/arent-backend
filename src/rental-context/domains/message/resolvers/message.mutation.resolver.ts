import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { HttpException, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Ok, Result } from 'oxide.ts';

import { MarkMessageAsReadCommand } from '../commands/mark-message-as-read/mark-message-as-read.command';
import { MarkMessageAsReadRequest } from '../commands/mark-message-as-read/mark-message-as-read.request.dto';
import { SendMessageCommand } from '../commands/send-message/send-message.command';
import { SendMessageRequest } from '../commands/send-message/send-message.request.dto';
import { MessageResponse } from '../dtos/message.response.dto';
import { FindMessageService } from '../queries/find-message/find-message.service';

@Resolver()
export class MessageMutationGraphqlResolver {
  constructor(private commandBus: CommandBus, private readonly findByIdService: FindMessageService) {}

  @UseGuards(JwtAuthGuard())
  @Mutation(() => MessageResponse, { name: 'message__send' })
  async sendMessage(@IAM() iam: UserOrmEntity, @Args('input') input: SendMessageRequest): Promise<MessageResponse> {
    return ProblemResponse.catchProblems(MessageResponse, async () => {
      const result = await this.commandBus.execute<SendMessageCommand, Ok<UUID>>(
        new SendMessageCommand({
          id: new UUID(input.id),
          chatId: new UUID(input.chatId),
          senderId: new UUID(iam.id),
          type: input.type,
          media:
            input.mediaUrl && input.mediaName && input.mediaWeight
              ? { fileKey: input.mediaUrl, fileName: input.mediaName, fileWeight: input.mediaWeight }
              : undefined,
          text: input.text ? { text: input.text } : undefined,
        }),
      );

      if (result.isErr()) {
        throw result.unwrapErr();
      }

      const queryResult = await this.findByIdService.handle({ id: result.unwrap().value }, iam.id);

      if (queryResult.isErr()) {
        throw queryResult.unwrapErr();
      }

      return MessageResponse.create(queryResult.unwrap());
    });
  }

  @UseGuards(JwtAuthGuard())
  @Mutation(() => Boolean, { name: 'message__mark_as_read' })
  async markAsRead(@IAM() iam: UserOrmEntity, @Args('input') input: MarkMessageAsReadRequest): Promise<boolean> {
    const result = await this.commandBus.execute<MarkMessageAsReadCommand, Result<boolean, HttpException>>(
      new MarkMessageAsReadCommand(new UUID(input.id), new UUID(iam.id)),
    );

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return result.isOk();
  }
}
