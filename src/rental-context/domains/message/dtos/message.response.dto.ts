import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { Field, ObjectType } from '@nestjs/graphql';

import { MessageModel } from '../models/message.model';
import { ChatIsNotActiveProblem } from '../problems/chat-is-not-active.problem';

@ObjectType()
export class MessageResponse implements ProblemResponse {
  @Field(() => MessageModel, { nullable: true })
  message?: MessageModel;

  @Field(() => ChatIsNotActiveProblem, { nullable: true })
  problem?: ChatIsNotActiveProblem;

  static create(props: MessageOrmEntity) {
    const payload = new MessageResponse();

    payload.message = MessageModel.create(props);

    return payload;
  }
}
