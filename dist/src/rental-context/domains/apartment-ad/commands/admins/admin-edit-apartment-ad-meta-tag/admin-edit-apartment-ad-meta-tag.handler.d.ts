import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { AdminEditApartmentAdMetatagCommand } from './admin-edit-apartment-ad-meta-tag.command';
export declare class AdminEditApartmentAdMetaTagHandler implements ICommandHandler<AdminEditApartmentAdMetatagCommand> {
    private readonly apartmentAdIdentificatorRepository;
    constructor(apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository);
    execute(command: AdminEditApartmentAdMetatagCommand): Promise<Result<UUID, HttpException>>;
}
