import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface GeoPoint {
    lat: number;
    lng: number;
}
export interface AddressCreateProps {
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    region?: string;
    geoPoint: GeoPoint;
}
export interface AddressProps extends AddressCreateProps {
    timezone: string;
}
export declare class AddressVO extends ValueObject<AddressProps> {
    private constructor();
    static create(createProps: AddressCreateProps): AddressVO;
    get timezone(): string;
    unpackCreatedProps(): AddressCreateProps;
    protected validate(props: AddressProps): void;
    static isNotEmpty(props: {
        country?: string;
        city?: string;
        region?: string;
        street?: string;
        houseNumber?: string;
        geoPoint: {
            lat?: number;
            lng?: number;
        };
        timezone?: string;
    }): AddressProps | undefined;
}
