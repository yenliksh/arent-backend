import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { ProblemTypes } from '@libs/problems/types';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailAlreadyUsedProblem extends LocalizedProblem {
  constructor() {
    super(ProblemTypes.EMAIL_ALREADY_USED_PROBLEM);
  }
}
