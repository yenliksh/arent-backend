import { ApartmentAdEntity } from 'src/rental-context/domains/apartment-ad/domain/entities/apartment-ad.entity';
import { ElasticsearchRepositoryPort } from '../ports/elasticsearch.repository.port';
export declare type ShortTermRentDocumentRepositoryPort = ElasticsearchRepositoryPort<ApartmentAdEntity>;
