import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { Result } from 'oxide.ts';
import { ApartmentAdEntity } from 'src/rental-context/domains/apartment-ad/domain/entities/apartment-ad.entity';
import { ElasticsearchDocumentMapperBase } from '../base-classes/elasticsearch-document.mapper.base';
import { LongTermRentDocumentProps } from '../documents/long-term-rent.document';
export declare class LongTermRentDocumentMapper extends ElasticsearchDocumentMapperBase<LongTermRentDocumentProps, LongTermRentOrmEntity, ApartmentAdEntity> {
    ormEntityToDocument(ormEntity: LongTermRentOrmEntity): Promise<Result<LongTermRentDocumentProps, Error>>;
    domainEntityToDocument(domainEntity: ApartmentAdEntity): Promise<Result<LongTermRentDocumentProps, Error>>;
    protected getPropsFromOrmEntity({ id, updatedAt, createdAt, apartmentAd, cost, currency, apartmentAdId, }: LongTermRentOrmEntity): Promise<LongTermRentDocumentProps | undefined>;
    protected getPropsFromDomainEntity(entity: ApartmentAdEntity): Promise<LongTermRentDocumentProps | undefined>;
}
