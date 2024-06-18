import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class UserOrmEntityLoader implements NestDataLoader<UserOrmEntity['id'], UserOrmEntity | undefined> {
  generateDataLoader(): DataLoader<UserOrmEntity['id'], UserOrmEntity | undefined> {
    return new DataLoader<string, UserOrmEntity | undefined>(async (userIds) => {
      const users = await UserOrmEntity.query().findByIds(userIds as string[]);
      return userIds.map((id) => users.find((user) => user.id === id));
    });
  }
}
