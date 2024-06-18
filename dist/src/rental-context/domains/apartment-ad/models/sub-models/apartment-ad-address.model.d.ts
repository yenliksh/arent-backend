export declare class ApartmentAdAddressModel {
    country: string;
    city: string;
    region?: string;
    street: string;
    houseNumber: string;
    lat: number;
    lng: number;
    constructor(model: ApartmentAdAddressModel);
    static create(props: ApartmentAdAddressModel): ApartmentAdAddressModel;
    static getAddressProps({ country, city, street, region, houseNumber, lat, lng, }: Partial<ApartmentAdAddressModel>): ApartmentAdAddressModel | undefined;
}
