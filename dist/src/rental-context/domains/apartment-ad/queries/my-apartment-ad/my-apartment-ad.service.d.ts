import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { MyApartmentAdRequest } from './my-apartment-ad.request';
export declare class MyApartmentAdService {
    handle(dto: MyApartmentAdRequest, userId: UserOrmEntity['id']): Promise<Result<ApartmentAdOrmEntity, HttpException>>;
    handleById(apartmentId: string): Promise<Result<ApartmentAdOrmEntity, HttpException>>;
    handleAll(): Promise<Result<ApartmentAdOrmEntity[], HttpException>>;
}
