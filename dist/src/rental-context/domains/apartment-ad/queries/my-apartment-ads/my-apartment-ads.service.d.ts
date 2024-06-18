import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { Ok } from 'oxide.ts';
import { MyApartmentAdsRequest } from './my-apartment-ads.request';
export declare class MyApartmentAdsService {
    handle(dto: MyApartmentAdsRequest, userId: UserOrmEntity['id']): Promise<Ok<[ShortTermRentOrmEntity[], LongTermRentOrmEntity[]]>>;
    private apartmentAdStatusMap;
    private getApartmentAdUnionRentalType;
}
