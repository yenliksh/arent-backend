import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { ApartmentAdLongTermRentModel } from '../models/apartment-ad-long-term-rent.model';
import { ApartmentAdShortTermRentModel } from '../models/apartment-ad-short-term-rent.model';
export declare class ApartmentAdsUnionResponse {
    apartmentAdShortTermRent: ApartmentAdShortTermRentModel[];
    apartmentAdLongTermRent: ApartmentAdLongTermRentModel[];
    static create([shortRent, longRent]: [ShortTermRentOrmEntity[], LongTermRentOrmEntity[]]): ApartmentAdsUnionResponse;
}
