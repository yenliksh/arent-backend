import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ApartmentAdEntity } from 'src/rental-context/domains/apartment-ad/domain/entities/apartment-ad.entity';
import { ElasticsearchRepositoryBase } from '../base-classes/elasticsearch.repository.base';
import { ShortTermRentDocumentProps } from '../documents/short-term-rent.document';
import { ShortTermRentDocumentRepositoryPort } from './short-term-rent.document-repository.port';
export declare class ShortTermRentDocumentRepository extends ElasticsearchRepositoryBase<ShortTermRentDocumentProps, ShortTermRentOrmEntity, ApartmentAdEntity> implements ShortTermRentDocumentRepositoryPort {
    private lockedDateDocument;
    private rentedDateDocument;
    constructor(client: ElasticsearchService);
    save(entity: ApartmentAdEntity, slug?: string): Promise<string>;
    private getLockedDatesBody;
    update(entity: ApartmentAdEntity): Promise<void>;
    delete(entity: ApartmentAdEntity): Promise<string>;
    deleteById(shortTermRentId: string): Promise<string>;
    seedIndex(): Promise<boolean>;
    createIndex(): Promise<boolean>;
    isExistIndex(): Promise<boolean>;
}
