import { LongTermRentIsRentedProblem } from '@domains/apartment-ad/problems/long-term-rent-is-rented.problem';
import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';
import { ApartmentAdEntity } from 'src/rental-context/domains/apartment-ad/domain/entities/apartment-ad.entity';

import { PublishApartmentAdByTypeCommand } from './publish-apartment-ad-by-type.command';

@CommandHandler(PublishApartmentAdByTypeCommand)
export class PublishApartmentAdByTypeHandler implements ICommandHandler<PublishApartmentAdByTypeCommand> {
  constructor(
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly longTermRentDocumentRepository: LongTermRentDocumentRepository,
    private readonly shortTermRentDocumentRepository: ShortTermRentDocumentRepository,
  ) {}

  public async execute(
    command: PublishApartmentAdByTypeCommand,
  ): Promise<Result<UUID, HttpException | LocalizedProblem>> {
    const { apartmentAdId, periodType } = command;

    const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId);

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    if (apartmentAd.longTermRentIsRented && periodType === ApartmentRentPeriodType.LONG_TERM) {
      return Err(new LongTermRentIsRentedProblem());
    }

    apartmentAd.publish(periodType);

    const result = await this.apartmentAdRepository.save(apartmentAd);

    await this.saveToElasticsearch(periodType, apartmentAd);

    return Ok(result);
  }

  private async saveToElasticsearch(periodType: ApartmentRentPeriodType, apartmentAd: ApartmentAdEntity) {
    if (periodType === ApartmentRentPeriodType.LONG_TERM && apartmentAd.isLongTermRent) {
      await this.longTermRentDocumentRepository.save(apartmentAd);
    }

    if (periodType === ApartmentRentPeriodType.SHORT_TERM && apartmentAd.isShortTermRent) {
      await this.shortTermRentDocumentRepository.save(apartmentAd);
    }
  }
}
