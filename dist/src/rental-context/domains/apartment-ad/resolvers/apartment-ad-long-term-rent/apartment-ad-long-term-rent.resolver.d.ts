import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import DataLoader from 'dataloader';
import { ApartmentAdLongTermRentModel } from 'src/rental-context/domains/apartment-ad/models/apartment-ad-long-term-rent.model';
import { ApartmentAdModel } from 'src/rental-context/domains/apartment-ad/models/apartment-ad.model';
export declare class ApartmentAdLongTermRentResolver {
    apartmentAd(longTermRent: ApartmentAdLongTermRentModel, apartmentAdOrmEntityLoader: DataLoader<string, ApartmentAdOrmEntity>): Promise<ApartmentAdModel>;
}
