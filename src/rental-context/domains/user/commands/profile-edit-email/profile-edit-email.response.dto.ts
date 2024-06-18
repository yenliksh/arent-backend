import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ProblemResponse } from '@libs/ddd/interface-adapters/dtos/problem.response.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserMeModel } from 'src/rental-context/domains/user/models/user.model';
import { EmailAlreadyUsedProblem } from 'src/rental-context/domains/user/problems/email-already-used.problem';

@ObjectType()
export class ProfileEditEmailResponse implements ProblemResponse {
  @Field(() => UserMeModel, { nullable: true })
  user?: UserMeModel;

  @Field(() => EmailAlreadyUsedProblem, { nullable: true })
  problem?: EmailAlreadyUsedProblem;

  static create(props: UserOrmEntity) {
    const payload = new ProfileEditEmailResponse();

    payload.user = UserMeModel.create(props);

    return payload;
  }
}
