import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';
import { PauseApartmentAdByTypeCommand } from './pause-apartment-ad-by-type.command';
export declare class PauseApartmentAdByTypeHandler implements ICommandHandler<PauseApartmentAdByTypeCommand> {
    private readonly apartmentAdRepository;
    private readonly shortTermRentDocumentRepository;
    private readonly longTermRentDocumentRepository;
    constructor(apartmentAdRepository: ApartmentAdRepository, shortTermRentDocumentRepository: ShortTermRentDocumentRepository, longTermRentDocumentRepository: LongTermRentDocumentRepository);
    execute(command: PauseApartmentAdByTypeCommand): Promise<Result<UUID, HttpException>>;
    private removeFromElasticsearch;
}
