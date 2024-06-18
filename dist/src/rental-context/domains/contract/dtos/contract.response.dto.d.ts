import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { ContractChatModel } from '../models/contract.model';
import { ContractOfferAlreadyExistsProblem } from '../problems/contract-offer-already-exists.problem';
export declare class ContractResponse implements ProblemResponse {
    contract?: ContractChatModel;
    problem?: ContractOfferAlreadyExistsProblem;
    static create(props: ContractOrmEntity): ContractResponse;
}
