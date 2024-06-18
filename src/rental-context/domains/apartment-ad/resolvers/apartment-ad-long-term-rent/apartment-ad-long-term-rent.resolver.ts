import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ApartmentAdOrmEntityLoader } from '@infrastructure/dataloader/apartment-ad.dataloader';
import { Loader } from '@libs/dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { ApartmentAdLongTermRentModel } from 'src/rental-context/domains/apartment-ad/models/apartment-ad-long-term-rent.model';
import { ApartmentAdModel } from 'src/rental-context/domains/apartment-ad/models/apartment-ad.model';

@Resolver(() => ApartmentAdLongTermRentModel)
export class ApartmentAdLongTermRentResolver {
  @ResolveField(() => ApartmentAdModel)
  async apartmentAd(
    @Parent() longTermRent: ApartmentAdLongTermRentModel,
    @Loader(ApartmentAdOrmEntityLoader.name) apartmentAdOrmEntityLoader: DataLoader<string, ApartmentAdOrmEntity>,
  ) {
    const { apartmentAdId, apartmentAd } = longTermRent;

    if (apartmentAd) {
      return apartmentAd;
    }

    const result = await apartmentAdOrmEntityLoader.load(apartmentAdId);

    return ApartmentAdModel.create(result);
  }
}
