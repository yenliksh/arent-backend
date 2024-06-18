import { ApartmentAdDescriptionProps } from '../../domain/value-objects/apartment-ad-description.value-object';
declare type ApartmentAdDescriptionModelCreateProps = Partial<ApartmentAdDescriptionProps>;
export declare class ApartmentAdDescriptionModel {
    name?: string;
    description?: string | null;
    remoteView?: boolean | null;
    selfCheckIn?: boolean | null;
    freeParking?: boolean | null;
    workSpace?: boolean | null;
    quite?: boolean | null;
    forFamily?: boolean | null;
    constructor(model: ApartmentAdDescriptionModel);
    static create(props: ApartmentAdDescriptionModelCreateProps): ApartmentAdDescriptionModel;
}
export {};
