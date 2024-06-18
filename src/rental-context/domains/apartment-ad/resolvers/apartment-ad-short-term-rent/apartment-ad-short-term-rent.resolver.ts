import { ApartmentAdLockedDatesModel } from '@domains/apartment-ad/models/sub-models/apartment-ad-locked-dates.model';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ShortTermRentLockedDateOrmEntity } from '@infrastructure/database/entities/short-term-rent-locked-dates.orm-entity';
import { ShortTermRentLockedDateOrmEntityLoader } from '@infrastructure/dataloader/short-term-rent-locked-date.dataloader';
import { Loader } from '@libs/dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';

import { ApartmentAdOrmEntityLoader } from '../../../../../infrastructure/dataloader/apartment-ad.dataloader';
import { ApartmentAdShortTermRentModel } from '../../models/apartment-ad-short-term-rent.model';
import { ApartmentAdModel } from '../../models/apartment-ad.model';

@Resolver(() => ApartmentAdShortTermRentModel)
export class ApartmentAdShortTermRentResolver {
  @ResolveField(() => ApartmentAdModel)
  async apartmentAd(
    @Parent() shortTermRent: ApartmentAdShortTermRentModel,
    @Loader(ApartmentAdOrmEntityLoader.name) apartmentAdOrmEntityLoader: DataLoader<string, ApartmentAdOrmEntity>,
  ) {
    const { apartmentAdId, apartmentAd } = shortTermRent;

    if (apartmentAd) {
      return apartmentAd;
    }

    const result = await apartmentAdOrmEntityLoader.load(apartmentAdId);

    return ApartmentAdModel.create(result);
  }

  @ResolveField(() => [ApartmentAdLockedDatesModel])
  async lockedDates(
    @Parent() shortTermRent: ApartmentAdShortTermRentModel,
    @Loader(ShortTermRentLockedDateOrmEntityLoader.name)
    lockedDateOrmEntityLoader: DataLoader<string, ShortTermRentLockedDateOrmEntity[]>,
  ) {
    const { id } = shortTermRent;

    const result = await lockedDateOrmEntityLoader.load(id);

    return result?.map((i) => ApartmentAdLockedDatesModel.create(i)) || [];
  }
}
