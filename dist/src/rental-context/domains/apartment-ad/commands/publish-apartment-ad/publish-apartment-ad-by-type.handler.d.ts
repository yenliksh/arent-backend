import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { LocalizedProblem } from '@libs/ddd/interface-adapters/base-classes/localized-problem.base';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';
import { PublishApartmentAdByTypeCommand } from './publish-apartment-ad-by-type.command';
export declare class PublishApartmentAdByTypeHandler implements ICommandHandler<PublishApartmentAdByTypeCommand> {
    private readonly apartmentAdRepository;
    private readonly longTermRentDocumentRepository;
    private readonly shortTermRentDocumentRepository;
    constructor(apartmentAdRepository: ApartmentAdRepository, longTermRentDocumentRepository: LongTermRentDocumentRepository, shortTermRentDocumentRepository: ShortTermRentDocumentRepository);
    execute(command: PublishApartmentAdByTypeCommand): Promise<Result<UUID, HttpException | LocalizedProblem>>;
    private saveToElasticsearch;
}
