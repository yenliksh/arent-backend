import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { BaseOkProps, OkResponse } from '@libs/ddd/interface-adapters/dtos/ok.response.dto';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
declare type SaveCardStartResponseProps = BaseOkProps & {
    url?: string;
};
export declare class SaveCardStartResponse extends OkResponse implements ProblemResponse {
    constructor(props: SaveCardStartResponseProps);
    problem?: InnopayServiceBadRequestProblem;
    url?: string;
    static create(prop: SaveCardStartResponseProps): SaveCardStartResponse;
}
export {};
