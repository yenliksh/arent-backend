import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { ProblemTypes } from '@libs/problems/types';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvalidVerificationPhoneCodeProblem extends LocalizedProblem {
  constructor() {
    super(ProblemTypes.INVALID_VERIFICATION_PHONE_CODE_PROBLEM);
  }
}
