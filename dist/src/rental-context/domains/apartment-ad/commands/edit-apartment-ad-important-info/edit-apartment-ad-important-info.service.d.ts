import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';
import { EditApartmentAdImportantInfoRequest } from './edit-apartment-ad-important-info.request.dto';
export declare class EditApartmentAdImportantInfoService {
    private readonly apartmentAdRepository;
    private readonly longTermRentDocumentRepository;
    private readonly shortTermRentDocumentRepository;
    constructor(apartmentAdRepository: ApartmentAdRepository, longTermRentDocumentRepository: LongTermRentDocumentRepository, shortTermRentDocumentRepository: ShortTermRentDocumentRepository);
    handle(dto: EditApartmentAdImportantInfoRequest, userId: UserOrmEntity['id']): Promise<Result<UUID, HttpException>>;
    private updateElasticsearch;
}
