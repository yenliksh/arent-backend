import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { ProblemTypes } from '@libs/problems/types';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LongTermRentIsRentedProblem extends LocalizedProblem {
  constructor() {
    super(ProblemTypes.LONG_TERM_RENT_IS_RENTED_PROBLEM);
  }
}
