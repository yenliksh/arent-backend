import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { BadRequestException, HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { AdminEditApartmentAdMetatagCommand } from './admin-edit-apartment-ad-meta-tag.command';

@CommandHandler(AdminEditApartmentAdMetatagCommand)
export class AdminEditApartmentAdMetaTagHandler implements ICommandHandler<AdminEditApartmentAdMetatagCommand> {
  constructor(private readonly apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository) {}

  public async execute(command: AdminEditApartmentAdMetatagCommand): Promise<Result<UUID, HttpException>> {
    const { apartmentAdId, h1, title, description } = command;

    const apartmentAdIdentificator = await this.apartmentAdIdentificatorRepository.findOneByApartmentId(apartmentAdId);

    if (!apartmentAdIdentificator) {
      return Err(new NotFoundException('Apartment ad identificator not found'));
    }

    if (!h1 && !title && !description) {
      return Err(new BadRequestException('at least one field must be filled'));
    }

    if (h1) {
      apartmentAdIdentificator.adminEditH1MetaTag(h1);
    }

    if (title) {
      apartmentAdIdentificator.adminEditTitleMetaTag(title);
    }

    if (description) {
      apartmentAdIdentificator.adminEditDescriptionMetaTag(description);
    }

    const result = await this.apartmentAdIdentificatorRepository.save(apartmentAdIdentificator);

    return Ok(result);
  }
}
