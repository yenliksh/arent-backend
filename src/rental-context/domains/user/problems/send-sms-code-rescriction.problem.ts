import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { ProblemTypes } from '@libs/problems/types';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SendSmsCodeRestrictionProblem extends LocalizedProblem {
  constructor(secondsLeftToSendAgain: number) {
    super(ProblemTypes.SEND_SMS_CODE_RESTRICTION_PROBLEM, {
      secondsLeftToSendAgain,
    });
  }
}
