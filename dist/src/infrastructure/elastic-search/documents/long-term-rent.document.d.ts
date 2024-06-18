import { CurrencyType } from 'src/rental-context/domains/apartment-ad/domain/types';
import { MappingProperty } from '../types';
import { ApartmentAdBaseDocument, ApartmentAdBaseProps } from './apartment-ad.base.document';
export interface LongTermRentDocumentProps extends ApartmentAdBaseProps {
    cost: number;
    currency: CurrencyType;
    apartmentAdId: string;
    slug?: string;
}
export declare class LongTermRentDocument extends ApartmentAdBaseDocument<Omit<LongTermRentDocumentProps, keyof ApartmentAdBaseProps>> {
    indexName: string;
    protected propertiesScheme: Record<keyof Omit<LongTermRentDocumentProps, keyof ApartmentAdBaseProps>, MappingProperty>;
    getIndicesOptions(): {
        index: string;
        include_type_name: boolean;
        body: {
            settings: import("../types").IndicesIndexSettings;
            mappings: import("../elasticsearch.types").Mappings<ApartmentAdBaseProps & Omit<LongTermRentDocumentProps, keyof ApartmentAdBaseProps>>;
        };
    };
}
