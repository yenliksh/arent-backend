import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { ProblemTypes } from '@libs/problems/types';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InnopayServiceBadRequestProblem extends LocalizedProblem {
  constructor(errorDescription?: string) {
    super(ProblemTypes.INNOPAY_SERVICE_BAD_REQUEST, { errorDescription });
  }
}
