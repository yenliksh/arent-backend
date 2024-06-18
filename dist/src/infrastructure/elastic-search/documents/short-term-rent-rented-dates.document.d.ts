import { ElasticsearchDocumentBase } from '../base-classes/elasticsearch.document.base';
import { Mappings } from '../elasticsearch.types';
import { IndicesIndexSettings, MappingProperty } from '../types';
import { GeoPointElasticSearch } from './apartment-ad.base.document';
export interface ShortTermRentsRentedDateDocumentProps {
    id: string;
    slug: string;
    startDate: string;
    endDate: string;
    geoPoint: GeoPointElasticSearch;
}
export declare class ShortTermRentRentedDateDocument extends ElasticsearchDocumentBase<ShortTermRentsRentedDateDocumentProps> {
    indexName: string;
    protected propertiesScheme: Record<keyof ShortTermRentsRentedDateDocumentProps, MappingProperty>;
    getIndicesOptions(): {
        index: string;
        include_type_name: boolean;
        body: {
            settings: IndicesIndexSettings;
            mappings: Mappings<ShortTermRentsRentedDateDocumentProps>;
        };
    };
    protected get settings(): IndicesIndexSettings;
    protected get mappingProperties(): Mappings<ShortTermRentsRentedDateDocumentProps>;
}
