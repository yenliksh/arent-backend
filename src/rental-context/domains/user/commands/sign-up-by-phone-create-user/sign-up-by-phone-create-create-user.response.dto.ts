import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserMeModel } from 'src/rental-context/domains/user/models/user.model';
import { EmailAlreadyUsedProblem } from 'src/rental-context/domains/user/problems/email-already-used.problem';

type SignUpByPhoneCreateUserResponseProps = Omit<SignUpByPhoneCreateUserResponse, 'user'> & {
  user?: UserOrmEntity;
};

@ObjectType()
export class SignUpByPhoneCreateUserResponse implements ProblemResponse {
  @Field(() => UserMeModel, { nullable: true })
  user?: UserMeModel;

  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @Field(() => EmailAlreadyUsedProblem, { nullable: true })
  problem?: EmailAlreadyUsedProblem;

  static create(props: SignUpByPhoneCreateUserResponseProps) {
    const payload = new SignUpByPhoneCreateUserResponse();

    payload.user = props.user ? UserMeModel.create(props.user) : undefined;
    payload.refreshToken = props.refreshToken;
    payload.token = props.token;

    return payload;
  }
}
