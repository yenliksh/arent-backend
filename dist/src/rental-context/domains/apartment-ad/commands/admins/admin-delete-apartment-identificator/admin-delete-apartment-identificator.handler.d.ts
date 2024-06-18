import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { AdminDeleteApartmentIdentificatorCommand } from './admin-delete-apartment-identificator.command';
export declare class AdminDeleteApartmentIdentificatorHandler implements ICommandHandler<AdminDeleteApartmentIdentificatorCommand> {
    private readonly apartmentIdentificatorRepository;
    constructor(apartmentIdentificatorRepository: ApartmentAdIdentificatorRepository);
    execute(command: AdminDeleteApartmentIdentificatorCommand): Promise<Result<ApartmentAdIdentificatorEntity, HttpException>>;
}
