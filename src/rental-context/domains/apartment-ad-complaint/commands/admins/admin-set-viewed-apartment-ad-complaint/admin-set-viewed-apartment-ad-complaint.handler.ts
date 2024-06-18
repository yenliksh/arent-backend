import { ApartmentAdComplaintRepository } from '@domain-repositories/apartment-ad-complaint/apartment-ad-complaint.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { AdminSetViewedApartmentAdComplaintCommand } from './admin-set-viewed-apartment-ad-complaint.command';

@CommandHandler(AdminSetViewedApartmentAdComplaintCommand)
export class AdminViewedApartmentAdComplaintHandler
  implements ICommandHandler<AdminSetViewedApartmentAdComplaintCommand>
{
  constructor(private readonly apartmentAdComplaintRepository: ApartmentAdComplaintRepository) {}

  public async execute(command: AdminSetViewedApartmentAdComplaintCommand): Promise<Result<UUID, HttpException>> {
    const { apartmentAdComplaintId } = command;

    const apartmentAdComplaint = await this.apartmentAdComplaintRepository.findOneById(apartmentAdComplaintId);

    if (!apartmentAdComplaint) {
      return Err(new NotFoundException('ApartmentAdComplaint not found'));
    }

    apartmentAdComplaint.adminViewed();

    const result = await this.apartmentAdComplaintRepository.save(apartmentAdComplaint);

    return Ok(result);
  }
}
