import { ApartmentAdLongTermRentViewModel } from '@domains/apartment-ad/models/apartment-ad-long-term-rent.model';
import { ApartmentAdTimeIntervalModel } from '@domains/apartment-ad/models/sub-models/apartment-ad-postgres-interval.model';
import { TimeInterval } from '@domains/apartment-ad/types';
import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
export declare class FindLongTermRentAdResponse {
    data: ApartmentAdLongTermRentViewModel;
    averageResponseOnRequest?: ApartmentAdTimeIntervalModel;
    static create: (data: LongTermRentOrmEntity, averageResponseOnRequest?: TimeInterval) => FindLongTermRentAdResponse;
}
