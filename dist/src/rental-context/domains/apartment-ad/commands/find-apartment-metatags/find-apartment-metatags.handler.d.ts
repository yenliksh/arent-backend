import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { FindApartmentMetatagsCommand } from './find-apartment-metatags.command';
export declare class FindApartmentMetatagsHandler implements ICommandHandler<FindApartmentMetatagsCommand> {
    private readonly apartmentAdIdentificatorRepository;
    constructor(apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository);
    execute(command: FindApartmentMetatagsCommand): Promise<Result<ApartmentAdIdentificatorEntity, HttpException>>;
}
