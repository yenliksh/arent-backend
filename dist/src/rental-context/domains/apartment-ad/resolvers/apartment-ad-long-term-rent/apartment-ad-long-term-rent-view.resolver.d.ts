import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import DataLoader from 'dataloader';
import { ApartmentAdLongTermRentViewModel } from 'src/rental-context/domains/apartment-ad/models/apartment-ad-long-term-rent.model';
import { ApartmentAdViewModel } from 'src/rental-context/domains/apartment-ad/models/apartment-ad.model';
export declare class ApartmentAdLongTermRentViewResolver {
    apartmentAd(longTermRent: ApartmentAdLongTermRentViewModel, apartmentAdOrmEntityLoader: DataLoader<string, ApartmentAdOrmEntity>): Promise<ApartmentAdViewModel>;
}
