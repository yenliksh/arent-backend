import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { Field, ObjectType, createUnionType } from '@nestjs/graphql';

import { ContractRequestModel } from '../models/contract-request.model';
import { ChosenDatesIsNotAvailableProblem } from '../problems/chosen-dates-is-not-available.problem';
import { ContractRequestAlreadyExistsProblem } from '../problems/contract-request-already-exists.problem';
import { ReduceTheNumberOfGuestsProblem } from '../problems/reduce-the-number-of-guests.problem';
import { SpecifyPaymentMethodProblem } from '../problems/specify-payment-method.problem';

export const ContractRequestProblems = createUnionType({
  name: 'ContractRequestProblems',
  types: () => [
    ChosenDatesIsNotAvailableProblem,
    ReduceTheNumberOfGuestsProblem,
    SpecifyPaymentMethodProblem,
    ContractRequestAlreadyExistsProblem,
  ],
});

@ObjectType()
export class ContractRequestResponse implements ProblemResponse {
  @Field(() => ContractRequestModel, { nullable: true })
  contractRequest?: ContractRequestModel;

  @Field(() => ContractRequestProblems, { nullable: true })
  problem?:
    | ChosenDatesIsNotAvailableProblem
    | ReduceTheNumberOfGuestsProblem
    | SpecifyPaymentMethodProblem
    | ContractRequestAlreadyExistsProblem;

  static create(prop: ContractRequestOrmEntity) {
    const payload = new ContractRequestResponse();

    payload.contractRequest = ContractRequestModel.create(prop);

    return payload;
  }
}
