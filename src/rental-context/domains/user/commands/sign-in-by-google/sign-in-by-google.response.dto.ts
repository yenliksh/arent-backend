import { UndefinedReturnGoogleOauthProblem } from '@domains/user/problems/undefined-return-google-oauth.problem';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserMeModel } from 'src/rental-context/domains/user/models/user.model';

type SignInByGoogleResponseProps = Omit<SignInByGoogleResponse, 'user'> & {
  user?: UserOrmEntity;
};

@ObjectType()
export class SignInByGoogleResponse implements ProblemResponse {
  @Field(() => UserMeModel, { nullable: true })
  user?: UserMeModel;

  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => UndefinedReturnGoogleOauthProblem, { nullable: true })
  problem?: UndefinedReturnGoogleOauthProblem;

  static create(props: SignInByGoogleResponseProps) {
    const payload = new SignInByGoogleResponse();

    payload.user = props.user ? UserMeModel.create(props.user) : undefined;
    payload.refreshToken = props.refreshToken;
    payload.token = props.token;

    return payload;
  }
}
