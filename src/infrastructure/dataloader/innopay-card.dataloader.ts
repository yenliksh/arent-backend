import { InnopayCardOrmEntity } from '@infrastructure/database/entities/innopay-card.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class InnopayCardOrmEntityLoader
  implements NestDataLoader<InnopayCardOrmEntity['id'], InnopayCardOrmEntity | undefined>
{
  generateDataLoader(): DataLoader<InnopayCardOrmEntity['id'], InnopayCardOrmEntity | undefined> {
    return new DataLoader<string, InnopayCardOrmEntity | undefined>(async (innopayCardIds) => {
      const innopayCards = await InnopayCardOrmEntity.query().findByIds(innopayCardIds as string[]);
      return innopayCardIds.map((id) => innopayCards.find((innopayCard) => innopayCard.id === id));
    });
  }
}
