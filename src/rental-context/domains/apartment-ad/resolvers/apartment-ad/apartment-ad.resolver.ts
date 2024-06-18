import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UserOrmEntityLoader } from '@infrastructure/dataloader/user.dataloader';
import { Loader } from '@libs/dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { UserMeModel } from 'src/rental-context/domains/user/models/user.model';

import { ApartmentAdLongTermRentOrmEntityLoader } from '../../dataloader/apartment-ad-long-term-rent.dataloader';
import { ApartmentAdShortTermRentOrmEntityLoader } from '../../dataloader/apartment-ad-short-term-rent.dataloader';
import { RentPeriodType } from '../../domain/types';
import { ApartmentAdLongTermRentModel } from '../../models/apartment-ad-long-term-rent.model';
import { ApartmentAdShortTermRentModel } from '../../models/apartment-ad-short-term-rent.model';
import { ApartmentAdModel } from '../../models/apartment-ad.model';

@Resolver(() => ApartmentAdModel)
export class ApartmentAdResolver {
  @ResolveField(() => UserMeModel)
  async landlord(
    @Parent() apartmentAd: ApartmentAdModel,
    @Loader(UserOrmEntityLoader.name) userOrmEntityLoader: DataLoader<string, UserOrmEntity>,
  ) {
    const { landlordId } = apartmentAd;

    const result = await userOrmEntityLoader.load(landlordId);

    return UserMeModel.create(result);
  }

  @ResolveField(() => ApartmentAdShortTermRentModel)
  async shortTermRent(
    @Parent() apartmentAd: ApartmentAdModel,
    @Loader(ApartmentAdShortTermRentOrmEntityLoader.name)
    apartmentAdShortTermRentOrmEntityLoader: DataLoader<string, ShortTermRentOrmEntity>,
  ) {
    const { id, shortTermRent, rentPeriodType } = apartmentAd;

    if (shortTermRent) {
      return shortTermRent;
    }

    if (rentPeriodType === RentPeriodType.LONG_TERM) {
      return shortTermRent;
    }

    const result = await apartmentAdShortTermRentOrmEntityLoader.load(id);

    return ApartmentAdShortTermRentModel.create(result);
  }

  @ResolveField(() => ApartmentAdLongTermRentModel)
  async longTermRent(
    @Parent() apartmentAd: ApartmentAdModel,
    @Loader(ApartmentAdLongTermRentOrmEntityLoader.name)
    apartmentAdLongTermRentOrmEntityLoader: DataLoader<string, LongTermRentOrmEntity>,
  ) {
    const { id, longTermRent, rentPeriodType } = apartmentAd;

    if (longTermRent) {
      return longTermRent;
    }

    if (rentPeriodType === RentPeriodType.SHORT_TERM) {
      return longTermRent;
    }

    const result = await apartmentAdLongTermRentOrmEntityLoader.load(id);

    return ApartmentAdLongTermRentModel.create(result);
  }
}
