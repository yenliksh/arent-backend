import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { UserMeModel } from 'src/rental-context/domains/user/models/user.model';
import { EmailAlreadyUsedProblem } from 'src/rental-context/domains/user/problems/email-already-used.problem';
declare type SignUpByPhoneCreateUserResponseProps = Omit<SignUpByPhoneCreateUserResponse, 'user'> & {
    user?: UserOrmEntity;
};
export declare class SignUpByPhoneCreateUserResponse implements ProblemResponse {
    user?: UserMeModel;
    token?: string;
    refreshToken?: string;
    problem?: EmailAlreadyUsedProblem;
    static create(props: SignUpByPhoneCreateUserResponseProps): SignUpByPhoneCreateUserResponse;
}
export {};
