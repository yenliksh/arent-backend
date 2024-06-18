import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { AdminDeleteApartmentIdentificatorCommand } from './admin-delete-apartment-identificator.command';

@CommandHandler(AdminDeleteApartmentIdentificatorCommand)
export class AdminDeleteApartmentIdentificatorHandler
  implements ICommandHandler<AdminDeleteApartmentIdentificatorCommand>
{
  constructor(private readonly apartmentIdentificatorRepository: ApartmentAdIdentificatorRepository) {}

  public async execute(
    command: AdminDeleteApartmentIdentificatorCommand,
  ): Promise<Result<ApartmentAdIdentificatorEntity, HttpException>> {
    const { apartmentAdId } = command;

    const apartmentAd = await this.apartmentIdentificatorRepository.findOneByApartmentId(apartmentAdId);

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad identificator not found'));
    }

    const result = await this.apartmentIdentificatorRepository.delete(apartmentAd);

    return Ok(result);
  }
}
