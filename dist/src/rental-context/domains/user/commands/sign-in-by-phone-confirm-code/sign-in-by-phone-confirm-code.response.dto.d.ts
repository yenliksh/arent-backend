import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { UserMeModel } from 'src/rental-context/domains/user/models/user.model';
import { InvalidVerificationPhoneCodeProblem } from 'src/rental-context/domains/user/problems/invalid-verification-phone-code.problem';
declare type SignInByPhoneConfirmCodeResponseProps = Omit<SignInByPhoneConfirmCodeResponse, 'user'> & {
    user?: UserOrmEntity;
};
export declare class SignInByPhoneConfirmCodeResponse implements ProblemResponse {
    user?: UserMeModel;
    refreshToken?: string;
    token?: string;
    problem?: InvalidVerificationPhoneCodeProblem;
    static create(props: SignInByPhoneConfirmCodeResponseProps): SignInByPhoneConfirmCodeResponse;
}
export {};
