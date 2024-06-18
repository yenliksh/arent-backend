import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { ProblemTypes } from '@libs/problems/types';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatIsNotActiveProblem extends LocalizedProblem {
  constructor() {
    super(ProblemTypes.CHAT_IS_NOT_ACTIVE);
  }
}
