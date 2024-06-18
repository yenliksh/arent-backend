import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { BadRequestException, HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { AdminEditApartmentAdDescriptionCommand } from './admin-edit-apartment-ad-description.command';

@CommandHandler(AdminEditApartmentAdDescriptionCommand)
export class AdminEditApartmentAdDescriptionHandler implements ICommandHandler<AdminEditApartmentAdDescriptionCommand> {
  constructor(private readonly apartmentAdRepository: ApartmentAdRepository) {}

  public async execute(command: AdminEditApartmentAdDescriptionCommand): Promise<Result<UUID, HttpException>> {
    const { apartmentAdId, name, descriptionText } = command;

    const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId);

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    if (!name && !descriptionText) {
      return Err(new BadRequestException('at least one field must be filled'));
    }

    if (descriptionText) {
      apartmentAd.adminEditDescriptionText(descriptionText);
    }

    if (name) {
      apartmentAd.adminEditDescriptionName(name);
    }

    const result = await this.apartmentAdRepository.save(apartmentAd);

    return Ok(result);
  }
}
