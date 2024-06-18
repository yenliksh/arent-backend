import { ApartmentAdLockedDatesModel } from '@domains/apartment-ad/models/sub-models/apartment-ad-locked-dates.model';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ShortTermRentLockedDateOrmEntity } from '@infrastructure/database/entities/short-term-rent-locked-dates.orm-entity';
import DataLoader from 'dataloader';
import { ApartmentAdShortTermRentViewModel } from '../../models/apartment-ad-short-term-rent.model';
import { ApartmentAdViewModel } from '../../models/apartment-ad.model';
export declare class ApartmentAdShortTermRentViewResolver {
    apartmentAd(shortTermRent: ApartmentAdShortTermRentViewModel, apartmentAdOrmEntityLoader: DataLoader<string, ApartmentAdOrmEntity>): Promise<ApartmentAdViewModel>;
    lockedDates(shortTermRent: ApartmentAdShortTermRentViewModel, lockedDateOrmEntityLoader: DataLoader<string, ShortTermRentLockedDateOrmEntity[]>): Promise<ApartmentAdLockedDatesModel[]>;
}
