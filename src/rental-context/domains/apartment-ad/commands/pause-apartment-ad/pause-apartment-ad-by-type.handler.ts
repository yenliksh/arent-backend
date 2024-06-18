import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';
import { ApartmentAdEntity } from 'src/rental-context/domains/apartment-ad/domain/entities/apartment-ad.entity';

import { PauseApartmentAdByTypeCommand } from './pause-apartment-ad-by-type.command';

@CommandHandler(PauseApartmentAdByTypeCommand)
export class PauseApartmentAdByTypeHandler implements ICommandHandler<PauseApartmentAdByTypeCommand> {
  constructor(
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly shortTermRentDocumentRepository: ShortTermRentDocumentRepository,
    private readonly longTermRentDocumentRepository: LongTermRentDocumentRepository,
  ) {}

  public async execute(command: PauseApartmentAdByTypeCommand): Promise<Result<UUID, HttpException>> {
    const { apartmentAdId, periodType } = command;

    const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId);

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    apartmentAd.pause(periodType);

    const result = await this.apartmentAdRepository.save(apartmentAd);

    await this.removeFromElasticsearch(periodType, apartmentAd);

    return Ok(result);
  }

  private async removeFromElasticsearch(periodType: ApartmentRentPeriodType, apartmentAd: ApartmentAdEntity) {
    if (periodType === ApartmentRentPeriodType.LONG_TERM && apartmentAd.longTermRentId) {
      await this.longTermRentDocumentRepository.delete(apartmentAd);
    }

    if (periodType === ApartmentRentPeriodType.SHORT_TERM && apartmentAd.shortTermRentId) {
      await this.shortTermRentDocumentRepository.delete(apartmentAd);
    }
  }
}
