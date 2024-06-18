import { InnopayCardOrmEntity } from '@infrastructure/database/entities/innopay-card.orm-entity';
import { InnopayUsersOrmEntity } from '@infrastructure/database/entities/innopay-users.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';

import { FindMyCardsRequest } from './find-my-cards.request';

@Injectable()
export class FindMyCardsService {
  async handle(
    userId: UserOrmEntity['id'],
    input?: FindMyCardsRequest,
  ): Promise<Result<InnopayCardOrmEntity[], HttpException>> {
    const innopayUserSubQuery = InnopayUsersOrmEntity.query().where({ userId });
    const cardsQuery = InnopayUsersOrmEntity.relatedQuery('cards').for(innopayUserSubQuery);

    if (input?.type) {
      cardsQuery.where('appointmentType', input.type);
    }

    const cards = await cardsQuery;

    if (!cards) {
      return Err(new NotFoundException('Cards not found'));
    }

    return Ok(cards);
  }
}
