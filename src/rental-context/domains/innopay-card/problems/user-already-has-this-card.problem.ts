import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { ProblemTypes } from '@libs/problems/types';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserAlreadyHasThisCardProblem extends LocalizedProblem {
  constructor() {
    super(ProblemTypes.USER_ALREADY_HAS_THIS_CARD);
  }
}
