import { ApartmentAdShortTermRentViewModel } from '@domains/apartment-ad/models/apartment-ad-short-term-rent.model';
import { ApartmentAdTimeIntervalModel } from '@domains/apartment-ad/models/sub-models/apartment-ad-postgres-interval.model';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { TimeInterval } from '../../types';
export declare class FindShortTermRentAdResponse {
    data: ApartmentAdShortTermRentViewModel;
    averageResponseOnRequest?: ApartmentAdTimeIntervalModel;
    static create: (data: ShortTermRentOrmEntity, averageResponseOnRequest?: TimeInterval) => FindShortTermRentAdResponse;
}
