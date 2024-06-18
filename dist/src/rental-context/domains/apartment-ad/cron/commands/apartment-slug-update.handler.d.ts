import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { CreateApartmentAdIdentificatorService } from '@domains/apartment-ad/commands/create-apartment-ad-identificator/create-apartment-ad-identificator.service';
import { MyApartmentAdService } from '@domains/apartment-ad/queries/my-apartment-ad/my-apartment-ad.service';
import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { ICommandHandler } from '@nestjs/cqrs';
import { Ok } from 'oxide.ts';
import { ApartmentSlugUpdateCommand } from './apartment-slug-update.command';
export declare class ApartmentSlugUpdateHandler implements ICommandHandler<ApartmentSlugUpdateCommand> {
    private readonly findMyApartmentAdService;
    private readonly apartmentAdRepository;
    private readonly apartmentAdIdentificatorRepository;
    private readonly longTermRentDocumentRepository;
    private readonly shortTermRentDocumentRepository;
    private readonly createApartmentAdIdentificatorService;
    constructor(findMyApartmentAdService: MyApartmentAdService, apartmentAdRepository: ApartmentAdRepository, apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository, longTermRentDocumentRepository: LongTermRentDocumentRepository, shortTermRentDocumentRepository: ShortTermRentDocumentRepository, createApartmentAdIdentificatorService: CreateApartmentAdIdentificatorService);
    execute(command: ApartmentSlugUpdateCommand): Promise<Ok<boolean>>;
}
