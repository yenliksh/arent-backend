import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import DataLoader from 'dataloader';
import { UserMeModel } from 'src/rental-context/domains/user/models/user.model';
import { ApartmentAdLongTermRentModel } from '../../models/apartment-ad-long-term-rent.model';
import { ApartmentAdShortTermRentModel } from '../../models/apartment-ad-short-term-rent.model';
import { ApartmentAdModel } from '../../models/apartment-ad.model';
export declare class ApartmentAdResolver {
    landlord(apartmentAd: ApartmentAdModel, userOrmEntityLoader: DataLoader<string, UserOrmEntity>): Promise<UserMeModel>;
    shortTermRent(apartmentAd: ApartmentAdModel, apartmentAdShortTermRentOrmEntityLoader: DataLoader<string, ShortTermRentOrmEntity>): Promise<ApartmentAdShortTermRentModel | undefined>;
    longTermRent(apartmentAd: ApartmentAdModel, apartmentAdLongTermRentOrmEntityLoader: DataLoader<string, LongTermRentOrmEntity>): Promise<ApartmentAdLongTermRentModel | undefined>;
}
