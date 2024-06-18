import { InnopayCardOrmEntity } from '@infrastructure/database/entities/innopay-card.orm-entity';
import { InnopayServiceBadRequestProblem } from '@infrastructure/problems/innopay-service-bad-request.problem';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { InnopayCardModel } from 'src/rental-context/domains/innopay-card/models/innopay-card.model';
import { UserAlreadyHasThisCardProblem } from 'src/rental-context/domains/innopay-card/problems/user-already-has-this-card.problem';
export declare const InnopayBadRequestAndUserHasCardProblem: InnopayServiceBadRequestProblem;
export declare class SaveCardEndResponse implements ProblemResponse {
    card?: InnopayCardModel;
    problem?: InnopayServiceBadRequestProblem | UserAlreadyHasThisCardProblem;
    static create(prop: InnopayCardOrmEntity): SaveCardEndResponse;
}
