import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { ProblemTypes } from '@libs/problems/types';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeletingCardIsActiveProblem extends LocalizedProblem {
  constructor() {
    super(ProblemTypes.DELETING_CARD_IS_ACTIVE_PROBLEM);
  }
}
