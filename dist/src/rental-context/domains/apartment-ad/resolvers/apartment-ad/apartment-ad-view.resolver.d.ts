import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import DataLoader from 'dataloader';
import { ApartmentAdLongTermRentViewModel } from 'src/rental-context/domains/apartment-ad/models/apartment-ad-long-term-rent.model';
import { ApartmentAdShortTermRentViewModel } from 'src/rental-context/domains/apartment-ad/models/apartment-ad-short-term-rent.model';
import { ApartmentAdModel, ApartmentAdViewModel } from 'src/rental-context/domains/apartment-ad/models/apartment-ad.model';
import { UserModel } from 'src/rental-context/domains/user/models/user.model';
export declare class ApartmentAdViewResolver {
    landlord(apartmentAd: ApartmentAdModel, userOrmEntityLoader: DataLoader<string, UserOrmEntity>): Promise<UserModel>;
    shortTermRent(apartmentAd: ApartmentAdViewModel, apartmentAdShortTermRentOrmEntityLoader: DataLoader<string, ShortTermRentOrmEntity>): Promise<import("src/rental-context/domains/apartment-ad/models/apartment-ad-short-term-rent.model").ApartmentAdShortTermRentModel | ApartmentAdShortTermRentViewModel | undefined>;
    longTermRent(apartmentAd: ApartmentAdViewModel, apartmentAdLongTermRentOrmEntityLoader: DataLoader<string, LongTermRentOrmEntity>): Promise<import("src/rental-context/domains/apartment-ad/models/apartment-ad-long-term-rent.model").ApartmentAdLongTermRentModel | ApartmentAdLongTermRentViewModel | undefined>;
}
