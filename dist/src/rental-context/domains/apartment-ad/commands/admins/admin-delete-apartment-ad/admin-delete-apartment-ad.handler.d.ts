import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { ApartmentAdEntity } from '@domains/apartment-ad/domain/entities/apartment-ad.entity';
import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { ContractRepository } from '../../../../../domain-repositories/contract/contract.repository';
import { AdminDeleteApartmentAdCommand } from './admin-delete-apartment-ad.command';
export declare class AdminDeleteApartmentAdHandler implements ICommandHandler<AdminDeleteApartmentAdCommand> {
    private readonly apartmentAdRepository;
    private readonly contractRepository;
    private readonly shortTermRentDocumentRepository;
    private readonly longTermRentDocumentRepository;
    constructor(apartmentAdRepository: ApartmentAdRepository, contractRepository: ContractRepository, shortTermRentDocumentRepository: ShortTermRentDocumentRepository, longTermRentDocumentRepository: LongTermRentDocumentRepository);
    execute(command: AdminDeleteApartmentAdCommand): Promise<Result<ApartmentAdEntity, HttpException>>;
    private removeFromElasticsearch;
}
