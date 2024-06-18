import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ApartmentAdOrmEntityLoader } from '@infrastructure/dataloader/apartment-ad.dataloader';
import { Loader } from '@libs/dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { ApartmentAdLongTermRentViewModel } from 'src/rental-context/domains/apartment-ad/models/apartment-ad-long-term-rent.model';
import { ApartmentAdViewModel } from 'src/rental-context/domains/apartment-ad/models/apartment-ad.model';

@Resolver(() => ApartmentAdLongTermRentViewModel)
export class ApartmentAdLongTermRentViewResolver {
  @ResolveField(() => ApartmentAdViewModel)
  async apartmentAd(
    @Parent() longTermRent: ApartmentAdLongTermRentViewModel,
    @Loader(ApartmentAdOrmEntityLoader.name) apartmentAdOrmEntityLoader: DataLoader<string, ApartmentAdOrmEntity>,
  ) {
    const { apartmentAdId, apartmentAd } = longTermRent;

    if (apartmentAd) {
      return apartmentAd;
    }

    const result = await apartmentAdOrmEntityLoader.load(apartmentAdId);

    return ApartmentAdViewModel.create(result);
  }
}
