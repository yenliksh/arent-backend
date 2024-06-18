import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { NestDataLoader } from '@libs/dataloader';
import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';

@Injectable()
export class ApartmentAdOrmEntityLoader
  implements NestDataLoader<ApartmentAdOrmEntity['id'], ApartmentAdOrmEntity | undefined>
{
  generateDataLoader(): DataLoader<ApartmentAdOrmEntity['id'], ApartmentAdOrmEntity | undefined> {
    return new DataLoader<string, ApartmentAdOrmEntity | undefined>(async (apartmentAdIds) => {
      const apartmentAds = await ApartmentAdOrmEntity.query()
        .findByIds(apartmentAdIds as string[])
        .withGraphFetched({ contractRequests: true });
      return apartmentAdIds.map((id) => apartmentAds.find((apartmentAd) => apartmentAd.id === id));
    });
  }
}
