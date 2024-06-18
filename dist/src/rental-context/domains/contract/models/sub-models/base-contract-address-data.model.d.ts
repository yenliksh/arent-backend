import { AddressCreateProps, GeoPoint } from '@domain-value-objects/address.value-object';
export declare class GeoPointModel implements GeoPoint {
    lat: number;
    lng: number;
    static create(props: GeoPoint): GeoPointModel;
}
export declare class BaseContractAddressDataModel implements AddressCreateProps {
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    region?: string;
    geoPoint: GeoPointModel;
    static create(props: AddressCreateProps): BaseContractAddressDataModel;
}
