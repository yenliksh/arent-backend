import { TimeInterval } from '@domains/apartment-ad/types';
import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { FindLongTermRentAdRequest } from './find-long-term-rent-ad.request';
export interface LongTermRentOrmEntityAndAverage {
    longTermRent: LongTermRentOrmEntity;
    averageResponseOnRequest: TimeInterval;
}
export declare class FindLongTermRentAdService {
    handle(dto: FindLongTermRentAdRequest, finderUserId?: string): Promise<LongTermRentOrmEntityAndAverage | undefined>;
    handleByApId(dto: FindLongTermRentAdRequest, finderUserId?: string): Promise<LongTermRentOrmEntityAndAverage | undefined>;
}
