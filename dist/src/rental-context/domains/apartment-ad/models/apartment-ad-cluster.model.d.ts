import { ApartmentType, CurrencyType } from '@domains/apartment-ad/domain/types';
import { LongTermRentDocumentProps } from '@infrastructure/elastic-search/documents/long-term-rent.document';
import { ShortTermRentDocumentProps } from '@infrastructure/elastic-search/documents/short-term-rent.document';
export declare class ApartmentAdClusterModel {
    id: string;
    title: string;
    apartmentType: ApartmentType;
    photo: string;
    lat: number;
    lng: number;
    cost: string;
    currency: CurrencyType;
    static create(props: LongTermRentDocumentProps | ShortTermRentDocumentProps): ApartmentAdClusterModel;
}
