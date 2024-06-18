import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UserOrmEntityLoader } from '@infrastructure/dataloader/user.dataloader';
import { Loader } from '@libs/dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { ApartmentAdLongTermRentOrmEntityLoader } from 'src/rental-context/domains/apartment-ad/dataloader/apartment-ad-long-term-rent.dataloader';
import { ApartmentAdShortTermRentOrmEntityLoader } from 'src/rental-context/domains/apartment-ad/dataloader/apartment-ad-short-term-rent.dataloader';
import { RentPeriodType } from 'src/rental-context/domains/apartment-ad/domain/types';
import { ApartmentAdLongTermRentViewModel } from 'src/rental-context/domains/apartment-ad/models/apartment-ad-long-term-rent.model';
import { ApartmentAdShortTermRentViewModel } from 'src/rental-context/domains/apartment-ad/models/apartment-ad-short-term-rent.model';
import {
  ApartmentAdModel,
  ApartmentAdViewModel,
} from 'src/rental-context/domains/apartment-ad/models/apartment-ad.model';
import { UserModel } from 'src/rental-context/domains/user/models/user.model';

@Resolver(() => ApartmentAdViewModel)
export class ApartmentAdViewResolver {
  @ResolveField(() => UserModel)
  async landlord(
    @Parent() apartmentAd: ApartmentAdModel,
    @Loader(UserOrmEntityLoader.name) userOrmEntityLoader: DataLoader<string, UserOrmEntity>,
  ) {
    const { landlordId } = apartmentAd;

    const result = await userOrmEntityLoader.load(landlordId);

    return UserModel.create(result);
  }

  @ResolveField(() => ApartmentAdShortTermRentViewModel)
  async shortTermRent(
    @Parent() apartmentAd: ApartmentAdViewModel,
    @Loader(ApartmentAdShortTermRentOrmEntityLoader.name)
    apartmentAdShortTermRentOrmEntityLoader: DataLoader<string, ShortTermRentOrmEntity>,
  ) {
    const { id, shortTermRent, rentPeriodType } = apartmentAd;

    if (shortTermRent) {
      return shortTermRent;
    }

    // implement for prevent use loader for that case
    if (rentPeriodType === RentPeriodType.LONG_TERM) {
      return shortTermRent;
    }

    const result = await apartmentAdShortTermRentOrmEntityLoader.load(id);

    return ApartmentAdShortTermRentViewModel.create(result);
  }

  @ResolveField(() => ApartmentAdLongTermRentViewModel)
  async longTermRent(
    @Parent() apartmentAd: ApartmentAdViewModel,
    @Loader(ApartmentAdLongTermRentOrmEntityLoader.name)
    apartmentAdLongTermRentOrmEntityLoader: DataLoader<string, LongTermRentOrmEntity>,
  ) {
    const { id, longTermRent, rentPeriodType } = apartmentAd;

    if (longTermRent) {
      return longTermRent;
    }

    // implement for prevent use loader for that case
    if (rentPeriodType === RentPeriodType.SHORT_TERM) {
      return longTermRent;
    }

    const result = await apartmentAdLongTermRentOrmEntityLoader.load(id);

    return ApartmentAdLongTermRentViewModel.create(result);
  }
}
