import { TimeInterval } from '@domains/apartment-ad/types';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { FindShortTermRentAdRequest } from './find-short-term-rent-ad.request';
export interface ShortTermRentOrmEntityAndAverage {
    shortTermRent: ShortTermRentOrmEntity;
    averageResponseOnRequest: TimeInterval;
}
export declare class FindShortTermRentAdService {
    handle(dto: FindShortTermRentAdRequest): Promise<ShortTermRentOrmEntityAndAverage | undefined>;
    handleByApId(dto: FindShortTermRentAdRequest): Promise<ShortTermRentOrmEntityAndAverage | undefined>;
}
