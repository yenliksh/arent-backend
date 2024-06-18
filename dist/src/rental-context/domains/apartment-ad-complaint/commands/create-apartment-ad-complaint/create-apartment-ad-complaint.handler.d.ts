import { ApartmentAdComplaintRepository } from '@domain-repositories/apartment-ad-complaint/apartment-ad-complaint.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ICommandHandler } from '@nestjs/cqrs';
import { Ok } from 'oxide.ts';
import { CreateApartmentAdComplaintCommand } from './create-apartment-ad-complaint.command';
export declare class CreateApartmentAdComplaintHandler implements ICommandHandler<CreateApartmentAdComplaintCommand> {
    private readonly apartmentAdComplaintRepository;
    constructor(apartmentAdComplaintRepository: ApartmentAdComplaintRepository);
    execute(command: CreateApartmentAdComplaintCommand): Promise<Ok<UUID>>;
}
