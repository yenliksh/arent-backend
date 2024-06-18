import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ApartmentAdEntity } from 'src/rental-context/domains/apartment-ad/domain/entities/apartment-ad.entity';
import { ElasticsearchRepositoryBase } from '../base-classes/elasticsearch.repository.base';
import { LongTermRentDocumentProps } from '../documents/long-term-rent.document';
import { LongTermRentDocumentRepositoryPort } from './long-term-rent.document-repository.port';
export declare class LongTermRentDocumentRepository extends ElasticsearchRepositoryBase<LongTermRentDocumentProps, LongTermRentOrmEntity, ApartmentAdEntity> implements LongTermRentDocumentRepositoryPort {
    constructor(client: ElasticsearchService);
    save(entity: ApartmentAdEntity, slug?: string): Promise<string>;
    update(entity: ApartmentAdEntity): Promise<void>;
    delete(entity: ApartmentAdEntity): Promise<string>;
    update2(entity: ApartmentAdEntity, apartmentSeo?: ApartmentAdIdentificatorEntity): Promise<string>;
    deleteById(longTermRentId: string): Promise<string>;
    seedIndex(): Promise<boolean>;
    createIndex(): Promise<boolean>;
    isExistIndex(): Promise<boolean>;
}
