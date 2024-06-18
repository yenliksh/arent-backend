import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';

@Injectable()
export class FindUserService {
  async handle(userId: UserOrmEntity['id']): Promise<Result<UserOrmEntity, HttpException>> {
    const user = await UserOrmEntity.query().findById(userId);

    if (!user) {
      return Err(new NotFoundException('User not found'));
    }

    return Ok(user);
  }
}
