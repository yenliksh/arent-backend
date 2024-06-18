import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { ApartmentAdEntity } from '@domains/apartment-ad/domain/entities/apartment-ad.entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { ContractRepository } from '../../../../domain-repositories/contract/contract.repository';
import { DeleteApartmentAdRequest } from './delete-apartment-ad.request.dto';
export declare class DeleteApartmentAdService {
    private readonly apartmentAdRepository;
    private readonly contractRepository;
    private readonly shortTermRentDocumentRepository;
    private readonly longTermRentDocumentRepository;
    constructor(apartmentAdRepository: ApartmentAdRepository, contractRepository: ContractRepository, shortTermRentDocumentRepository: ShortTermRentDocumentRepository, longTermRentDocumentRepository: LongTermRentDocumentRepository);
    handle(dto: DeleteApartmentAdRequest, userId: UserOrmEntity['id']): Promise<Result<ApartmentAdEntity, HttpException>>;
    private removeFromElasticsearch;
}
