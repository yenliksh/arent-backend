import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { AdminEditApartmentAdDescriptionCommand } from './admin-edit-apartment-ad-description.command';
export declare class AdminEditApartmentAdDescriptionHandler implements ICommandHandler<AdminEditApartmentAdDescriptionCommand> {
    private readonly apartmentAdRepository;
    constructor(apartmentAdRepository: ApartmentAdRepository);
    execute(command: AdminEditApartmentAdDescriptionCommand): Promise<Result<UUID, HttpException>>;
}
