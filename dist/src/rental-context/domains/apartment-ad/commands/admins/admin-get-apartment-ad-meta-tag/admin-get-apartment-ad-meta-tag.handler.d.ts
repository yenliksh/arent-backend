import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { AdminGetApartmentAdMetatagCommand } from './admin-get-apartment-ad-meta-tag.command';
export declare class AdminGetApartmentAdMetaTagHandler implements ICommandHandler<AdminGetApartmentAdMetatagCommand> {
    private readonly apartmentAdIdentificatorRepository;
    constructor(apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository);
    execute(command: AdminGetApartmentAdMetatagCommand): Promise<Result<ApartmentAdIdentificatorEntity, HttpException>>;
}
