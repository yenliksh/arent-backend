import { ApartmentAdComplaintRepository } from '@domain-repositories/apartment-ad-complaint/apartment-ad-complaint.repository';
import { ApartmentAdComplaintEntity } from '@domains/apartment-ad-complaint/domain/entities/apartment-ad-complaint.entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Ok } from 'oxide.ts';

import { CreateApartmentAdComplaintCommand } from './create-apartment-ad-complaint.command';

@CommandHandler(CreateApartmentAdComplaintCommand)
export class CreateApartmentAdComplaintHandler implements ICommandHandler<CreateApartmentAdComplaintCommand> {
  constructor(private readonly apartmentAdComplaintRepository: ApartmentAdComplaintRepository) {}

  public async execute(command: CreateApartmentAdComplaintCommand): Promise<Ok<UUID>> {
    const { input, userId } = command;

    const domainEntity = ApartmentAdComplaintEntity.create({ ...input, userId });

    const result = await this.apartmentAdComplaintRepository.save(domainEntity);

    return Ok(result);
  }
}
