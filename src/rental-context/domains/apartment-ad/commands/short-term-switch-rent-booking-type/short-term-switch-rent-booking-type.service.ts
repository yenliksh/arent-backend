import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';

import { ShortTermSwitchRentBookingTypeRequest } from './short-term-switch-rent-booking-type.request.dto';

@Injectable()
export class ShortTermSwitchRentBookingTypeService {
  constructor(
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly shortTermRentDocumentRepository: ShortTermRentDocumentRepository,
  ) {}

  async handle(
    dto: ShortTermSwitchRentBookingTypeRequest,
    userId: UserOrmEntity['id'],
  ): Promise<Result<UUID, HttpException>> {
    const { id } = dto;

    const apartmentAd = await this.apartmentAdRepository.findOne({ id: new UUID(id), landlordId: new UUID(userId) });

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    apartmentAd.switchRentBookingType();

    const result = await this.apartmentAdRepository.save(apartmentAd);

    await this.shortTermRentDocumentRepository.update(apartmentAd);

    return Ok(result);
  }
}
