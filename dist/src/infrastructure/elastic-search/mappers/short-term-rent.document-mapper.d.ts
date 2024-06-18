import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { Result } from 'oxide.ts';
import { ApartmentAdEntity } from 'src/rental-context/domains/apartment-ad/domain/entities/apartment-ad.entity';
import { ElasticsearchDocumentMapperBase } from '../base-classes/elasticsearch-document.mapper.base';
import { ShortTermRentDocumentProps } from '../documents/short-term-rent.document';
export declare class ShortTermRentDocumentMapper extends ElasticsearchDocumentMapperBase<ShortTermRentDocumentProps, ShortTermRentOrmEntity, ApartmentAdEntity> {
    ormEntityToDocument(ormEntity: ShortTermRentOrmEntity): Promise<Result<ShortTermRentDocumentProps, Error>>;
    domainEntityToDocument(domainEntity: ApartmentAdEntity): Promise<Result<ShortTermRentDocumentProps, Error>>;
    protected getPropsFromOrmEntity({ id, updatedAt, createdAt, apartmentAd, cost, currency, cancellationPolicy, rentBookingType, arrivalTime, departureTime, apartmentAdId, bookingAccessInMonths, }: ShortTermRentOrmEntity): Promise<ShortTermRentDocumentProps | undefined>;
    protected getPropsFromDomainEntity(entity: ApartmentAdEntity): Promise<ShortTermRentDocumentProps | undefined>;
}
