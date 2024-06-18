import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { ProblemTypes } from '@libs/problems/types';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReduceTheNumberOfGuestsProblem extends LocalizedProblem {
  constructor(numberOfGuests: number) {
    super(ProblemTypes.REDUCE_THE_NUMBER_OF_GUESTS_PROBLEM, { numberOfGuests });
  }
}
