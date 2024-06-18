import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { Field, ObjectType } from '@nestjs/graphql';

import { UserMeModel } from '../models/user.model';

@ObjectType()
export class UserMeResponse {
  @Field(() => UserMeModel)
  user: UserMeModel;

  static create(props: UserOrmEntity) {
    const payload = new UserMeResponse();

    payload.user = UserMeModel.create(props);

    return payload;
  }
}
