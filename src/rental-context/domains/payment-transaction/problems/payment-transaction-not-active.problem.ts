import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { ProblemTypes } from '@libs/problems/types';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentTransactionNotActiveProblem extends LocalizedProblem {
  constructor() {
    super(ProblemTypes.PAYMENT_TRANSACTION_NOT_ACTIVE);
  }
}
