import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { ProblemTypes } from '@libs/problems/types';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContractOfferAlreadyExistsProblem extends LocalizedProblem {
  constructor() {
    super(ProblemTypes.CONTRACT_OFFER_ALREADY_EXISTS);
  }
}
