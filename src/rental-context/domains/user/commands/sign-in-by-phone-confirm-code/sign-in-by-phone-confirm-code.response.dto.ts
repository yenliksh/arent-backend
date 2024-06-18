import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserMeModel } from 'src/rental-context/domains/user/models/user.model';
import { InvalidVerificationPhoneCodeProblem } from 'src/rental-context/domains/user/problems/invalid-verification-phone-code.problem';

type SignInByPhoneConfirmCodeResponseProps = Omit<SignInByPhoneConfirmCodeResponse, 'user'> & {
  user?: UserOrmEntity;
};

@ObjectType()
export class SignInByPhoneConfirmCodeResponse implements ProblemResponse {
  @Field(() => UserMeModel, { nullable: true })
  user?: UserMeModel;

  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => InvalidVerificationPhoneCodeProblem, { nullable: true })
  problem?: InvalidVerificationPhoneCodeProblem;

  static create(props: SignInByPhoneConfirmCodeResponseProps) {
    const payload = new SignInByPhoneConfirmCodeResponse();

    payload.user = props.user ? UserMeModel.create(props.user) : undefined;
    payload.refreshToken = props.refreshToken;
    payload.token = props.token;

    return payload;
  }
}
