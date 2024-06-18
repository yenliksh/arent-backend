import { ContractRequestOrmEntity } from '@infrastructure/database/entities/contract-request.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { ContractRequestModel } from '../models/contract-request.model';
import { ContractRequestAlreadyExistsProblem } from '../problems/contract-request-already-exists.problem';
export declare class ContractRequestAcceptResponse implements ProblemResponse {
    contractRequest?: ContractRequestModel;
    chatId?: string;
    problem?: ContractRequestAlreadyExistsProblem;
    static create(prop: ContractRequestOrmEntity, chatId?: string): ContractRequestAcceptResponse;
}
