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

export class ShortTermRentLockedDateDocument extends ElasticsearchDocumentBase<ShortTermRentsLockedDateDocumentProps> {
  public indexName = 'short_term_rent_locked_dates';

  protected propertiesScheme: Record<keyof ShortTermRentsLockedDateDocumentProps, MappingProperty> = {
    // shortTermRentId
    id: {
      type: 'keyword',
    },
    startDate: {
      type: 'date',
      format: 'strict_year_month_day', // yyyy-MM-dd
    },
    endDate: {
      type: 'date',
      format: 'strict_year_month_day', // yyyy-MM-dd
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

  protected get mappingProperties(): Mappings<ShortTermRentsLockedDateDocumentProps> {
    return {
      properties: this.propertiesScheme,
    };
  }
}
