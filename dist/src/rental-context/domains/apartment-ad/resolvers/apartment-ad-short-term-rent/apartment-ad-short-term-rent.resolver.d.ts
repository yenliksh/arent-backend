import { ApartmentAdLockedDatesModel } from '@domains/apartment-ad/models/sub-models/apartment-ad-locked-dates.model';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ShortTermRentLockedDateOrmEntity } from '@infrastructure/database/entities/short-term-rent-locked-dates.orm-entity';
import DataLoader from 'dataloader';
import { ApartmentAdShortTermRentModel } from '../../models/apartment-ad-short-term-rent.model';
import { ApartmentAdModel } from '../../models/apartment-ad.model';
export declare class ApartmentAdShortTermRentResolver {
    apartmentAd(shortTermRent: ApartmentAdShortTermRentModel, apartmentAdOrmEntityLoader: DataLoader<string, ApartmentAdOrmEntity>): Promise<ApartmentAdModel>;
    lockedDates(shortTermRent: ApartmentAdShortTermRentModel, lockedDateOrmEntityLoader: DataLoader<string, ShortTermRentLockedDateOrmEntity[]>): Promise<ApartmentAdLockedDatesModel[]>;
}
