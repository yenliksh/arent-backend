import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { getConvertedSlug } from '@libs/utils/get-converted-slug';
import { ApartmentAdApprovedEvent } from '@modules/notifications/services/apartment-ad-approved/apartment-ad-approved.event';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok, Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';

import { ApproveAdLongTermRentCommand } from './aprove.ad-long-term-rent.command';

@CommandHandler(ApproveAdLongTermRentCommand)
export class ApproveAdLongTermRentHandler implements ICommandHandler<ApproveAdLongTermRentCommand> {
  constructor(
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly longTermRentDocumentRepository: LongTermRentDocumentRepository,
    private readonly apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute(command: ApproveAdLongTermRentCommand): Promise<Result<UUID, HttpException>> {
    const { apartmentAdId } = command;

    const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId);

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    const apartmentIdentificator = await this.apartmentAdIdentificatorRepository.findOneByApartmentId(
      apartmentAd.id.value,
    );

    if (!apartmentIdentificator) {
      return Err(new NotFoundException('Apartment identificator not found'));
    }

    apartmentAd.approveLongTermRent();

    const apartmentSeoProps = apartmentIdentificator.getPropsCopy();

    const convertedTitle = getConvertedSlug(apartmentSeoProps.titleSeo || '');

    const slug = `${apartmentSeoProps.adSearchId}-${convertedTitle}`;

    if (apartmentAd.isLongTermRent) {
      await this.longTermRentDocumentRepository.save(apartmentAd, slug);
    }

    await this.apartmentAdIdentificatorRepository.updateByApartmentId(
      apartmentAd.id.value,
      apartmentSeoProps.titleSeo,
      slug,
    );

    const result = await this.apartmentAdRepository.save(apartmentAd);

    this.eventEmitter.emit(
      ApartmentAdApprovedEvent.eventName,
      ApartmentAdApprovedEvent.create({ recipientId: apartmentAd.landlordId }),
    );

    return Ok(result);
  }
}
