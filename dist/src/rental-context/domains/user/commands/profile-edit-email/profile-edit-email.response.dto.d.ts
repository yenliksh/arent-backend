import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { UserMeModel } from 'src/rental-context/domains/user/models/user.model';
import { EmailAlreadyUsedProblem } from 'src/rental-context/domains/user/problems/email-already-used.problem';
export declare class ProfileEditEmailResponse implements ProblemResponse {
    user?: UserMeModel;
    problem?: EmailAlreadyUsedProblem;
    static create(props: UserOrmEntity): ProfileEditEmailResponse;
}
