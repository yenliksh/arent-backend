import { CurrencyType } from 'src/rental-context/domains/apartment-ad/domain/types';

import { MappingProperty } from '../types';
import { ApartmentAdBaseDocument, ApartmentAdBaseProps } from './apartment-ad.base.document';

export interface LongTermRentDocumentProps extends ApartmentAdBaseProps {
  cost: number;
  currency: CurrencyType;
  apartmentAdId: string;
  slug?: string;
}

export class LongTermRentDocument extends ApartmentAdBaseDocument<
  Omit<LongTermRentDocumentProps, keyof ApartmentAdBaseProps>
> {
  public indexName = 'long_term_rents';

  protected propertiesScheme: Record<
    keyof Omit<LongTermRentDocumentProps, keyof ApartmentAdBaseProps>,
    MappingProperty
  > = {
    cost: {
      type: 'long',
    },
    currency: {
      type: 'keyword',
    },
    apartmentAdId: {
      type: 'keyword',
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
}
