import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { MessageModel } from '../models/message.model';
import { ChatIsNotActiveProblem } from '../problems/chat-is-not-active.problem';
export declare class MessageResponse implements ProblemResponse {
    message?: MessageModel;
    problem?: ChatIsNotActiveProblem;
    static create(props: MessageOrmEntity): MessageResponse;
}
