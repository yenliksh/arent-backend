import { ApartmentAdStatusType } from 'src/rental-context/domains/apartment-ad/domain/types';
export declare class MyApartmentAdStatusCountResponse {
    readonly [ApartmentAdStatusType.ACTIVE]: number;
    readonly [ApartmentAdStatusType.DRAFT]: number;
    readonly [ApartmentAdStatusType.PAUSED]: number;
    readonly [ApartmentAdStatusType.PROCESSING]: number;
    readonly [ApartmentAdStatusType.PUBLISHED]: number;
}
