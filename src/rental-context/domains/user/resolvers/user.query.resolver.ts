import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { UserMeModel } from '../models/user.model';

@Resolver()
export class UserQueryGraphqlResolver {
  @UseGuards(JwtAuthGuard())
  @Query(() => UserMeModel, { name: 'user__me' })
  async getMe(@IAM() iam: UserOrmEntity): Promise<UserMeModel> {
    return UserMeModel.create(iam);
  }
}
