import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { FindApartmentMetatagsCommand } from './find-apartment-metatags.command';

@CommandHandler(FindApartmentMetatagsCommand)
export class FindApartmentMetatagsHandler implements ICommandHandler<FindApartmentMetatagsCommand> {
  constructor(private readonly apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository) {}

  public async execute(
    command: FindApartmentMetatagsCommand,
  ): Promise<Result<ApartmentAdIdentificatorEntity, HttpException>> {
    const { id } = command;

    const apartmentAdIdentificator = await this.apartmentAdIdentificatorRepository.findOneBySearchId(id);

    if (!apartmentAdIdentificator) {
      return Err(new NotFoundException('Apartment ad identificator not found'));
    }

    return Ok(apartmentAdIdentificator);
  }
}
