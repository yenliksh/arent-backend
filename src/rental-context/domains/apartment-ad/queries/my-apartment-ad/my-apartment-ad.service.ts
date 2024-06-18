import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';

import { MyApartmentAdRequest } from './my-apartment-ad.request';

@Injectable()
export class MyApartmentAdService {
  async handle(
    dto: MyApartmentAdRequest,
    userId: UserOrmEntity['id'],
  ): Promise<Result<ApartmentAdOrmEntity, HttpException>> {
    const { id: apartmentId } = dto;

    const apartmentAd = await ApartmentAdOrmEntity.query()
      .findById(apartmentId)
      .where('landlordId', userId)
      .joinRaw('LEFT JOIN short_term_rents ON apartment_ads.id = short_term_rents."apartmentAdId"')
      .joinRaw('LEFT JOIN long_term_rents ON apartment_ads.id = long_term_rents."apartmentAdId"');

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    return Ok(apartmentAd);
  }

  async handleById(apartmentId: string): Promise<Result<ApartmentAdOrmEntity, HttpException>> {
    const apartmentAd = await ApartmentAdOrmEntity.query()
      .findById(apartmentId)
      .joinRaw('LEFT JOIN short_term_rents ON apartment_ads.id = short_term_rents."apartmentAdId"')
      .joinRaw('LEFT JOIN long_term_rents ON apartment_ads.id = long_term_rents."apartmentAdId"');

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    return Ok(apartmentAd);
  }

  async handleAll(): Promise<Result<ApartmentAdOrmEntity[], HttpException>> {
    const apartmentAd = await ApartmentAdOrmEntity.query()
      .joinRaw('LEFT JOIN short_term_rents ON apartment_ads.id = short_term_rents."apartmentAdId"')
      .joinRaw('LEFT JOIN long_term_rents ON apartment_ads.id = long_term_rents."apartmentAdId"');

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    return Ok(apartmentAd);
  }
}
