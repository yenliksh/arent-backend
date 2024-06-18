import { ApartmentAdEntity } from '@domains/apartment-ad/domain/entities/apartment-ad.entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';

import { EditApartmentAdTypeRequest } from './edit-apartment-ad-type.request.dto';

@Injectable()
export class EditApartmentAdTypeService {
  constructor(
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly longTermRentDocumentRepository: LongTermRentDocumentRepository,
    private readonly shortTermRentDocumentRepository: ShortTermRentDocumentRepository,
  ) {}

  async handle(dto: EditApartmentAdTypeRequest, userId: UserOrmEntity['id']): Promise<Result<UUID, HttpException>> {
    const { id, apartmentType, apartmentCategory } = dto;

    const apartmentAd = await this.apartmentAdRepository.findOne({ id: new UUID(id), landlordId: new UUID(userId) });

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    apartmentAd.setApartmentCategory(apartmentCategory);

    if (apartmentType) apartmentAd.setApartmentType(apartmentType);

    const result = await this.apartmentAdRepository.save(apartmentAd);

    this.updateElasticsearch(apartmentAd);

    return Ok(result);
  }

  private async updateElasticsearch(apartmentAd: ApartmentAdEntity) {
    if (apartmentAd.isLongTermRent && apartmentAd.longTermRentStatus?.isPublished) {
      await this.longTermRentDocumentRepository.update(apartmentAd);
    }

    if (apartmentAd.isShortTermRent && apartmentAd.shortTermRentStatus?.isPublished) {
      await this.shortTermRentDocumentRepository.update(apartmentAd);
    }
  }
}
