import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { ProblemTypes } from '@libs/problems/types';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChosenDatesIsNotAvailableProblem extends LocalizedProblem {
  constructor() {
    super(ProblemTypes.CHOSEN_DATES_IS_NOT_AVAILABLE_PROBLEM);
  }
}
