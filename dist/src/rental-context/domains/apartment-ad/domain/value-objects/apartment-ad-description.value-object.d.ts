import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface ApartmentAdDescriptionProps {
    name: string;
    description?: string;
    remoteView?: boolean;
    selfCheckIn?: boolean;
    freeParking?: boolean;
    workSpace?: boolean;
    quite?: boolean;
    forFamily?: boolean;
}
export declare class ApartmentAdDescriptionVO extends ValueObject<ApartmentAdDescriptionProps> {
    private constructor();
    static create({ name, description, remoteView, selfCheckIn, freeParking, workSpace, quite, forFamily, }: ApartmentAdDescriptionProps): ApartmentAdDescriptionVO;
    protected validate(props: ApartmentAdDescriptionProps): void;
}
