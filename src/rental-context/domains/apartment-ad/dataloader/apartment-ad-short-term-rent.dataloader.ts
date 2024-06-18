import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class ApartmentAdShortTermRentOrmEntityLoader
  implements NestDataLoader<ShortTermRentOrmEntity['id'], ShortTermRentOrmEntity | undefined>
{
  generateDataLoader(): DataLoader<ShortTermRentOrmEntity['id'], ShortTermRentOrmEntity | undefined> {
    return new DataLoader<string, ShortTermRentOrmEntity | undefined>(async (apartmentAdIds) => {
      const shortTermRents = await ApartmentAdOrmEntity.relatedQuery<ShortTermRentOrmEntity>('shortTermRent').for(
        apartmentAdIds as string[],
      );

      return apartmentAdIds.map((id) => shortTermRents.find((shortTermRent) => shortTermRent.apartmentAdId === id));
    });
  }
}
