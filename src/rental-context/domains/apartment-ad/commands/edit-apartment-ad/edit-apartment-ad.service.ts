import { ApartmentAdEntity } from '@domains/apartment-ad/domain/entities/apartment-ad.entity';
import { AdEditActions } from '@domains/apartment-ad/domain/types';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';

import { EditApartmentAdRequest } from './edit-apartment-ad.request.dto';

interface RentalMeta {
  id?: string;
  isPublished?: boolean;
  action: AdEditActions | null;
}
@Injectable()
export class EditApartmentAdService {
  constructor(
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly longTermRentDocumentRepository: LongTermRentDocumentRepository,
    private readonly shortTermRentDocumentRepository: ShortTermRentDocumentRepository,
  ) {}

  async handle(dto: EditApartmentAdRequest, userId: UserOrmEntity['id']): Promise<Result<UUID, HttpException>> {
    const { id, rentPeriodType, longTermRentCost, shortTermRentCost } = dto;

    const apartmentAd = await this.apartmentAdRepository.findOne({ id: new UUID(id), landlordId: new UUID(userId) });

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    const longTermRentId = apartmentAd.longTermRentId?.value;
    const longTermRentIsPublished = apartmentAd.longTermRentStatus?.isPublished;
    const shortTermRentId = apartmentAd.shortTermRentId?.value;
    const shortTermRentIsPublished = apartmentAd.shortTermRentStatus?.isPublished;

    const { longTermAction, shortTermAction } = apartmentAd.editApartmentAd({
      rentPeriodType,
      longTermRentCost,
      shortTermRentCost,
    });

    const result = await this.apartmentAdRepository.save(apartmentAd);

    this.updateElasticsearch(
      apartmentAd,
      {
        id: longTermRentId,
        isPublished: longTermRentIsPublished,
        action: longTermAction,
      },
      {
        id: shortTermRentId,
        isPublished: shortTermRentIsPublished,
        action: shortTermAction,
      },
    );

    return Ok(result);
  }

  private async updateElasticsearch(
    newApartmentAd: ApartmentAdEntity,
    longTermRentMeta: RentalMeta,
    shortTermRentMeta: RentalMeta,
  ) {
    if (longTermRentMeta.isPublished && longTermRentMeta.action === 'REMOVE' && longTermRentMeta.id) {
      await this.longTermRentDocumentRepository.deleteById(longTermRentMeta.id);
    }

    if (shortTermRentMeta.isPublished && shortTermRentMeta.action === 'REMOVE' && shortTermRentMeta.id) {
      await this.shortTermRentDocumentRepository.deleteById(shortTermRentMeta.id);
    }

    if (longTermRentMeta.isPublished && longTermRentMeta.action === 'UPDATE') {
      await this.longTermRentDocumentRepository.update(newApartmentAd);
    }

    if (shortTermRentMeta.isPublished && shortTermRentMeta.action === 'UPDATE') {
      await this.shortTermRentDocumentRepository.update(newApartmentAd);
    }
  }
}
