import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class ApartmentAdLongTermRentOrmEntityLoader
  implements NestDataLoader<LongTermRentOrmEntity['id'], LongTermRentOrmEntity | undefined>
{
  generateDataLoader(): DataLoader<LongTermRentOrmEntity['id'], LongTermRentOrmEntity | undefined> {
    return new DataLoader<string, LongTermRentOrmEntity | undefined>(async (apartmentAdIds) => {
      const longTermRents = await ApartmentAdOrmEntity.relatedQuery<LongTermRentOrmEntity>('longTermRent').for(
        apartmentAdIds as string[],
      );

      return apartmentAdIds.map((id) => longTermRents.find((longTermRent) => longTermRent.apartmentAdId === id));
    });
  }
}
