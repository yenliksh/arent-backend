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

export class ShortTermRentRentedDateDocument extends ElasticsearchDocumentBase<ShortTermRentsRentedDateDocumentProps> {
  public indexName = 'short_term_rent_rented_dates';

  protected propertiesScheme: Record<keyof ShortTermRentsRentedDateDocumentProps, MappingProperty> = {
    // shortTermRentId
    id: {
      type: 'keyword',
    },
    slug: {
      type: 'keyword',
    },
    startDate: {
      type: 'date',
      format: 'strict_date_time', // yyyy-MM-dd'T'HH:mm:ss.SSSZ
    },
    endDate: {
      type: 'date',
      format: 'strict_date_time', // yyyy-MM-dd'T'HH:mm:ss.SSSZ
    },
    geoPoint: {
      type: 'geo_point',
    },
  };

  getIndicesOptions() {
    return {
      index: this.indexName,
      include_type_name: false,
      body: {
        settings: this.settings,
        mappings: this.mappingProperties,
      },
    };
  }

  protected get settings(): IndicesIndexSettings {
    return {
      number_of_shards: 1,
      number_of_routing_shards: 3,
      max_ngram_diff: 49,
      analysis: {
        analyzer: {
          text_middle_index: {
            type: 'custom',
            tokenizer: 'keyword',
            filter: ['lowercase', 'asciifolding', 'ngram_filter'],
          },
        },
        filter: {
          ngram_filter: {
            type: 'ngram',
            min_gram: 1,
            max_gram: 50,
          },
        },
      },
    };
  }

  protected get mappingProperties(): Mappings<ShortTermRentsRentedDateDocumentProps> {
    return {
      properties: this.propertiesScheme,
    };
  }
}
