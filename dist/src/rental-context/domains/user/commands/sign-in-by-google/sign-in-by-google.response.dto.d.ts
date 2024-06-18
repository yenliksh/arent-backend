import { UndefinedReturnGoogleOauthProblem } from '@domains/user/problems/undefined-return-google-oauth.problem';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { UserMeModel } from 'src/rental-context/domains/user/models/user.model';
declare type SignInByGoogleResponseProps = Omit<SignInByGoogleResponse, 'user'> & {
    user?: UserOrmEntity;
};
export declare class SignInByGoogleResponse implements ProblemResponse {
    user?: UserMeModel;
    refreshToken?: string;
    token?: string;
    problem?: UndefinedReturnGoogleOauthProblem;
    static create(props: SignInByGoogleResponseProps): SignInByGoogleResponse;
}
export {};
