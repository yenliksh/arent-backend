import { ApartmentAdLockedDatesModel } from '@domains/apartment-ad/models/sub-models/apartment-ad-locked-dates.model';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ShortTermRentLockedDateOrmEntity } from '@infrastructure/database/entities/short-term-rent-locked-dates.orm-entity';
import { ShortTermRentLockedDateOrmEntityLoader } from '@infrastructure/dataloader/short-term-rent-locked-date.dataloader';
import { Loader } from '@libs/dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';

import { ApartmentAdOrmEntityLoader } from '../../../../../infrastructure/dataloader/apartment-ad.dataloader';
import { ApartmentAdShortTermRentViewModel } from '../../models/apartment-ad-short-term-rent.model';
import { ApartmentAdViewModel } from '../../models/apartment-ad.model';

@Resolver(() => ApartmentAdShortTermRentViewModel)
export class ApartmentAdShortTermRentViewResolver {
  @ResolveField(() => ApartmentAdViewModel)
  async apartmentAd(
    @Parent() shortTermRent: ApartmentAdShortTermRentViewModel,
    @Loader(ApartmentAdOrmEntityLoader.name) apartmentAdOrmEntityLoader: DataLoader<string, ApartmentAdOrmEntity>,
  ) {
    const { apartmentAdId, apartmentAd } = shortTermRent;

    if (apartmentAd) {
      return apartmentAd;
    }

    const result = await apartmentAdOrmEntityLoader.load(apartmentAdId);

    return ApartmentAdViewModel.create(result);
  }

  @ResolveField(() => [ApartmentAdLockedDatesModel])
  async lockedDates(
    @Parent() shortTermRent: ApartmentAdShortTermRentViewModel,
    @Loader(ShortTermRentLockedDateOrmEntityLoader.name)
    lockedDateOrmEntityLoader: DataLoader<string, ShortTermRentLockedDateOrmEntity[]>,
  ) {
    const { id } = shortTermRent;

    const result = await lockedDateOrmEntityLoader.load(id);

    return result?.map((i) => ApartmentAdLockedDatesModel.create(i)) || [];
  }
}
