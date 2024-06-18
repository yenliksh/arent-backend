import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { ApartmentAdIdentificatorOrmEntity } from '@infrastructure/database/entities/apartment-ad-identificator.orm-entity';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';

import { FindApartmentAdIdentificatorRequest } from './find-apartment-ad-identificator.request.dto';
import { FindApartmentAdsIdentificatorsRequest } from './find-apartment-ads-identificators.request.dto';

@Injectable()
export class FindApartmentAdIdentificatorService {
  constructor(private readonly apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository) {}

  async handle(
    dto: FindApartmentAdIdentificatorRequest,
  ): Promise<Result<ApartmentAdIdentificatorEntity, HttpException>> {
    const { id } = dto;

    const apartmentAd = await this.apartmentAdIdentificatorRepository.findOneBySearchId(id);

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    return Ok(apartmentAd);
  }

  async handleByApId(
    dto: FindApartmentAdIdentificatorRequest,
  ): Promise<Result<ApartmentAdIdentificatorOrmEntity, HttpException>> {
    const { id } = dto;

    const apartmentAd = await ApartmentAdIdentificatorOrmEntity.query().findOne({ apartmentId: id });

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    return Ok(apartmentAd);
  }

  async handleByApIds(
    dto: FindApartmentAdsIdentificatorsRequest,
  ): Promise<Result<ApartmentAdIdentificatorOrmEntity[], HttpException>> {
    const { ids } = dto;

    const apartmentAds = await this.apartmentAdIdentificatorRepository.findManyByApartmentIds(ids);

    if (!apartmentAds) {
      return Err(new NotFoundException('Apartment ads not found'));
    }

    return Ok(apartmentAds);
  }
}
