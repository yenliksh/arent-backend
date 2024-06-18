import { ElectricitySupplyEnum, GasSupplyEnum, ObjectPlacementEnum, WaterSupplyEnum } from '@infrastructure/enums';
import { ApartmentCategory, ApartmentType, RentPeriodType } from 'src/rental-context/domains/apartment-ad/domain/types';

import { ElasticsearchDocumentBase } from '../base-classes/elasticsearch.document.base';
import { Mappings } from '../elasticsearch.types';
import { IndicesIndexSettings, MappingProperty } from '../types';

export interface GeoPointElasticSearch {
  lat: number;
  lon: number;
}

export interface ApartmentAdBaseProps {
  id: string;
  updatedAt: Date;
  createdAt: Date;

  rentPeriodType: RentPeriodType;
  apartmentType: ApartmentType;
  apartmentCategory: ApartmentCategory;

  numberOfGuests: number | null;
  numberOfRooms: number | null;

  // address location
  geoPoint: GeoPointElasticSearch;

  // description field
  title: string;

  //seo
  slug?: string;

  // media field
  photo: string;

  remoteView: boolean | null;
  selfCheckIn: boolean | null;
  freeParking: boolean | null;
  workSpace: boolean | null;
  quite: boolean | null;
  forFamily: boolean | null;

  // rules fields
  allowedWithPets: boolean | null;
  allowedWithChildren: boolean | null;
  allowedToSmoke: boolean | null;
  allowedToHangingOut: boolean | null;

  //characteristics fields
  totalArea: number | null;
  landArea: number | null;
  territoryArea: number | null;
  objectArea: number | null;
  ceilingHeight: number | null;
  yearOfConstruction: number | null;
  floor: number | null;
  waterSupply: WaterSupplyEnum | null;
  electricitySupply: ElectricitySupplyEnum | null;
  gasSupply: GasSupplyEnum | null;
  objectPlacement: ObjectPlacementEnum | null;
  light: boolean | null;
  water: boolean | null;
  gas: boolean | null;
  sewerage: boolean | null;
  heating: boolean | null;
  ventilation: boolean | null;
}

export abstract class ApartmentAdBaseDocument<DocumentProps> extends ElasticsearchDocumentBase<
  DocumentProps & ApartmentAdBaseProps
> {
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

  protected abstract propertiesScheme: Record<keyof DocumentProps, MappingProperty>;

  protected get mappingProperties(): Mappings<ApartmentAdBaseProps & DocumentProps> {
    return {
      properties: {
        id: {
          type: 'keyword',
        },
        updatedAt: {
          type: 'date',
        },
        createdAt: {
          type: 'date',
        },
        rentPeriodType: {
          type: 'keyword',
        },
        apartmentType: {
          type: 'keyword',
        },
        apartmentCategory: {
          type: 'keyword',
        },

        numberOfGuests: {
          type: 'integer',
        },
        numberOfRooms: {
          type: 'integer',
        },

        // address location
        geoPoint: {
          type: 'geo_point',
        },

        // description field
        title: {
          type: 'text',
          index: false,
        },

        //seo
        slug: {
          type: 'text',
          index: false,
        },
        name: {
          type: 'text',
          index: false,
          store: false,
        },
        description: {
          type: 'text',
          index: false,
          store: false,
        },

        // media field
        photo: {
          type: 'text',
          index: false,
        },

        remoteView: {
          type: 'boolean',
        },
        selfCheckIn: {
          type: 'boolean',
        },
        freeParking: {
          type: 'boolean',
        },
        workSpace: {
          type: 'boolean',
        },
        quite: {
          type: 'boolean',
        },
        forFamily: {
          type: 'boolean',
        },

        // rules fields
        allowedWithPets: {
          type: 'boolean',
        },
        allowedWithChildren: {
          type: 'boolean',
        },
        allowedToSmoke: {
          type: 'boolean',
        },
        allowedToHangingOut: {
          type: 'boolean',
        },

        //characteristics fields
        totalArea: {
          type: 'integer',
        },
        landArea: {
          type: 'integer',
        },
        territoryArea: {
          type: 'integer',
        },
        objectArea: {
          type: 'integer',
        },
        ceilingHeight: {
          type: 'integer',
        },
        yearOfConstruction: {
          type: 'integer',
        },
        floor: {
          type: 'integer',
        },
        waterSupply: {
          type: 'keyword',
        },
        electricitySupply: {
          type: 'keyword',
        },
        gasSupply: {
          type: 'keyword',
        },
        objectPlacement: {
          type: 'keyword',
        },
        light: {
          type: 'boolean',
        },
        water: {
          type: 'boolean',
        },
        gas: {
          type: 'boolean',
        },
        sewerage: {
          type: 'boolean',
        },
        heating: {
          type: 'boolean',
        },
        ventilation: {
          type: 'boolean',
        },

        ...this.propertiesScheme,
      },
    };
  }
}
