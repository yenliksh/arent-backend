import { ApartmentAdComplaintRepository } from '@domain-repositories/apartment-ad-complaint/apartment-ad-complaint.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { AdminSetViewedApartmentAdComplaintCommand } from './admin-set-viewed-apartment-ad-complaint.command';
export declare class AdminViewedApartmentAdComplaintHandler implements ICommandHandler<AdminSetViewedApartmentAdComplaintCommand> {
    private readonly apartmentAdComplaintRepository;
    constructor(apartmentAdComplaintRepository: ApartmentAdComplaintRepository);
    execute(command: AdminSetViewedApartmentAdComplaintCommand): Promise<Result<UUID, HttpException>>;
}
