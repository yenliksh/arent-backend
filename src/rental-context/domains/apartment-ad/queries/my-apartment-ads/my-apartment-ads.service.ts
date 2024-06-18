import { ApartmentAdStatusType } from '@domains/apartment-ad/domain/types';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { Injectable } from '@nestjs/common';
import { Ok } from 'oxide.ts';

import { MyApartmentAdsRequest } from './my-apartment-ads.request';

@Injectable()
export class MyApartmentAdsService {
  async handle(
    dto: MyApartmentAdsRequest,
    userId: UserOrmEntity['id'],
  ): Promise<Ok<[ShortTermRentOrmEntity[], LongTermRentOrmEntity[]]>> {
    const { status } = dto;

    const [longTermRentAds, shortTermRentAds] = await this.apartmentAdStatusMap[status](userId);

    return Ok([shortTermRentAds, longTermRentAds]);
  }

  private apartmentAdStatusMap: {
    [P in ApartmentAdStatusType]: (userId: string) => Promise<[LongTermRentOrmEntity[], ShortTermRentOrmEntity[]]>;
  } = {
    // does not used by reason business rules was changed
    [ApartmentAdStatusType.ACTIVE]: (userId) =>
      this.getApartmentAdUnionRentalType(userId, ApartmentAdStatusType.ACTIVE),
    [ApartmentAdStatusType.PAUSED]: (userId) =>
      this.getApartmentAdUnionRentalType(userId, ApartmentAdStatusType.PAUSED),
    [ApartmentAdStatusType.PROCESSING]: (userId) =>
      this.getApartmentAdUnionRentalType(userId, ApartmentAdStatusType.PROCESSING),
    [ApartmentAdStatusType.PUBLISHED]: (userId) =>
      this.getApartmentAdUnionRentalType(userId, ApartmentAdStatusType.PUBLISHED),
    [ApartmentAdStatusType.DRAFT]: (userId) => this.getApartmentAdUnionRentalType(userId, ApartmentAdStatusType.DRAFT),
  };

  private getApartmentAdUnionRentalType(userId: string, status: ApartmentAdStatusType) {
    const apartmentAdSubQuery = ApartmentAdOrmEntity.query().where('landlordId', userId);

    const longTermRentAdsQuery = ApartmentAdOrmEntity.relatedQuery('longTermRent')
      .for(apartmentAdSubQuery)
      .where('status', '@>', [status])
      .orderBy('updatedAt', 'DESC');

    const shortTermRentAdsQuery = ApartmentAdOrmEntity.relatedQuery('shortTermRent')
      .for(apartmentAdSubQuery)
      .where('status', '@>', [status])
      .orderBy('updatedAt', 'DESC');

    return Promise.all([longTermRentAdsQuery, shortTermRentAdsQuery]);
  }
}
