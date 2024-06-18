import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { OkResponse } from '@libs/ddd/interface-adapters/dtos/ok.response.dto';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { InnopayCardEntity } from '../domain/entities/innopay-card.entity';
import { DeletingCardIsActiveProblem } from '../problems/deleting-card-is-active.problem';
export declare const InnopayBadRequestAndDeletingCardIsActiveProblem: InnopayServiceBadRequestProblem;
export declare class InnopayCardResponse extends OkResponse implements ProblemResponse {
    constructor(innopay: InnopayCardEntity);
    problem?: InnopayServiceBadRequestProblem | DeletingCardIsActiveProblem;
    static create(prop: InnopayCardEntity): InnopayCardResponse;
}
