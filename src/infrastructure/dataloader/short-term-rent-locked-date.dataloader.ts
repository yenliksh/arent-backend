import { ShortTermRentLockedDateOrmEntity } from '@infrastructure/database/entities/short-term-rent-locked-dates.orm-entity';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class ShortTermRentLockedDateOrmEntityLoader
  implements NestDataLoader<ShortTermRentOrmEntity['id'], ShortTermRentLockedDateOrmEntity[]>
{
  generateDataLoader(): DataLoader<ShortTermRentOrmEntity['id'], ShortTermRentLockedDateOrmEntity[]> {
    return new DataLoader<ShortTermRentOrmEntity['id'], ShortTermRentLockedDateOrmEntity[]>(
      async (shortTermRentIds) => {
        const lockedDates = await ShortTermRentLockedDateOrmEntity.query().whereIn(
          'shortTermRentId',
          shortTermRentIds as string[],
        );

        return shortTermRentIds.map((shortTermRentId) => {
          return lockedDates.filter((i) => i.shortTermRentId === shortTermRentId);
        });
      },
    );
  }
}
