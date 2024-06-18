import { ShortTermRentBookingType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { CurrencyType } from 'src/rental-context/domains/apartment-ad/domain/types';

import { MappingProperty } from '../types';
import { ApartmentAdBaseDocument, ApartmentAdBaseProps } from './apartment-ad.base.document';
import { LockedDates } from './types';

export interface ShortTermRentDocumentProps extends ApartmentAdBaseProps {
  cost: number;
  currency: CurrencyType;
  apartmentAdId: string;
  rentBookingType: ShortTermRentBookingType;
  arrivalTime: string | null;
  departureTime: string | null;
  cancellationPolicy: ShortTermRentCancellationPolicyType | null;
  slug?: string;

  // only for create locked dates indices
  lockedDates: LockedDates[] | null;
  // only for create rented dates indices
  rentedDates: LockedDates[] | null;
  bookingAccessInMonths: number | null;
}

type ShortTermRentDocumentPropsOmitted = Omit<ShortTermRentDocumentProps, keyof ApartmentAdBaseProps>;

export class ShortTermRentDocument extends ApartmentAdBaseDocument<ShortTermRentDocumentPropsOmitted> {
  public indexName = 'short_term_rents';

  protected propertiesScheme: Record<keyof ShortTermRentDocumentPropsOmitted, MappingProperty> = {
    currency: {
      type: 'keyword',
    },
    cost: {
      type: 'long',
    },
    apartmentAdId: {
      type: 'keyword',
    },
    rentBookingType: {
      type: 'keyword',
    },
    cancellationPolicy: {
      type: 'keyword',
    },
    arrivalTime: {
      type: 'date',
      format: 'hour_minute',
    },
    departureTime: {
      type: 'date',
      format: 'hour_minute',
    },
    lockedDates: {
      type: 'text',
      store: false,
      index: false,
    },
    rentedDates: {
      type: 'text',
      store: false,
      index: false,
    },
    bookingAccessInMonths: {
      type: 'integer',
      null_value: 0,
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
