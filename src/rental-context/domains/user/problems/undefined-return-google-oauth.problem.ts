import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { ProblemTypes } from '@libs/problems/types';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UndefinedReturnGoogleOauthProblem extends LocalizedProblem {
  constructor() {
    super(ProblemTypes.UNDEFINED_ERROR_GOOGLE_OAUTH);
  }
}
