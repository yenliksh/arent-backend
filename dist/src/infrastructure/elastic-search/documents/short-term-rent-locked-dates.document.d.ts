import { ElasticsearchDocumentBase } from '../base-classes/elasticsearch.document.base';
import { Mappings } from '../elasticsearch.types';
import { IndicesIndexSettings, MappingProperty } from '../types';
import { GeoPointElasticSearch } from './apartment-ad.base.document';
export interface ShortTermRentsLockedDateDocumentProps {
    id: string;
    startDate: string | null;
    endDate: string | null;
    geoPoint: GeoPointElasticSearch;
}
export declare class ShortTermRentLockedDateDocument extends ElasticsearchDocumentBase<ShortTermRentsLockedDateDocumentProps> {
    indexName: string;
    protected propertiesScheme: Record<keyof ShortTermRentsLockedDateDocumentProps, MappingProperty>;
    getIndicesOptions(): {
        index: string;
        include_type_name: boolean;
        body: {
            settings: IndicesIndexSettings;
            mappings: Mappings<ShortTermRentsLockedDateDocumentProps>;
        };
    };
    protected get settings(): IndicesIndexSettings;
    protected get mappingProperties(): Mappings<ShortTermRentsLockedDateDocumentProps>;
}
