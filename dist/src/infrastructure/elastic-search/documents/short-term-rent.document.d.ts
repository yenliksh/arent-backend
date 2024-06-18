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
    lockedDates: LockedDates[] | null;
    rentedDates: LockedDates[] | null;
    bookingAccessInMonths: number | null;
}
declare type ShortTermRentDocumentPropsOmitted = Omit<ShortTermRentDocumentProps, keyof ApartmentAdBaseProps>;
export declare class ShortTermRentDocument extends ApartmentAdBaseDocument<ShortTermRentDocumentPropsOmitted> {
    indexName: string;
    protected propertiesScheme: Record<keyof ShortTermRentDocumentPropsOmitted, MappingProperty>;
    getIndicesOptions(): {
        index: string;
        include_type_name: boolean;
        body: {
            settings: import("../types").IndicesIndexSettings;
            mappings: import("../elasticsearch.types").Mappings<ApartmentAdBaseProps & ShortTermRentDocumentPropsOmitted>;
        };
    };
}
export {};
