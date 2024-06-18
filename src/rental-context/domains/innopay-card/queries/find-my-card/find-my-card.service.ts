import { InnopayCardOrmEntity } from '@infrastructure/database/entities/innopay-card.orm-entity';
import { InnopayUsersOrmEntity } from '@infrastructure/database/entities/innopay-users.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';

import { FindMyCardRequest } from './find-my-card.request';

@Injectable()
export class FindMyCardService {
  async handle(
    dto: FindMyCardRequest,
    userId: UserOrmEntity['id'],
  ): Promise<Result<InnopayCardOrmEntity, HttpException>> {
    const { id } = dto;

    const innopayUserSubQuery = InnopayUsersOrmEntity.query().where({ userId });
    const card = await InnopayUsersOrmEntity.relatedQuery('cards').for(innopayUserSubQuery).findById(id);

    if (!card) {
      return Err(new NotFoundException('Cards not found'));
    }

    return Ok(card);
  }
}
