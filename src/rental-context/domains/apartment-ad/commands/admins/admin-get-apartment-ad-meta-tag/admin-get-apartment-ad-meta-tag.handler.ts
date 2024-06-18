import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { AdminGetApartmentAdMetatagCommand } from './admin-get-apartment-ad-meta-tag.command';

@CommandHandler(AdminGetApartmentAdMetatagCommand)
export class AdminGetApartmentAdMetaTagHandler implements ICommandHandler<AdminGetApartmentAdMetatagCommand> {
  constructor(private readonly apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository) {}

  public async execute(
    command: AdminGetApartmentAdMetatagCommand,
  ): Promise<Result<ApartmentAdIdentificatorEntity, HttpException>> {
    const { apartmentId } = command;

    const apartmentAdIdentificator = await this.apartmentAdIdentificatorRepository.findOneByApartmentId(apartmentId);

    if (!apartmentAdIdentificator) {
      return Err(new NotFoundException('Apartment ad identificator not found'));
    }

    return Ok(apartmentAdIdentificator);
  }
}
