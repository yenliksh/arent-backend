import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { ContractRequestModel } from '../models/contract-request.model';
import { ChosenDatesIsNotAvailableProblem } from '../problems/chosen-dates-is-not-available.problem';
import { ContractRequestAlreadyExistsProblem } from '../problems/contract-request-already-exists.problem';
import { ReduceTheNumberOfGuestsProblem } from '../problems/reduce-the-number-of-guests.problem';
import { SpecifyPaymentMethodProblem } from '../problems/specify-payment-method.problem';
export declare const ContractRequestProblems: ReduceTheNumberOfGuestsProblem;
export declare class ContractRequestResponse implements ProblemResponse {
    contractRequest?: ContractRequestModel;
    problem?: ChosenDatesIsNotAvailableProblem | ReduceTheNumberOfGuestsProblem | SpecifyPaymentMethodProblem | ContractRequestAlreadyExistsProblem;
    static create(prop: ContractRequestOrmEntity): ContractRequestResponse;
}
