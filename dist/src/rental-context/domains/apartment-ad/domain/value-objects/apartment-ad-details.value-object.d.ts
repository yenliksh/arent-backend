import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface ApartmentAdDetailsProps {
    numberOfRooms: number;
    numberOfGuests: number;
}
export declare class ApartmentAdDetailsVO extends ValueObject<ApartmentAdDetailsProps> {
    private constructor();
    static create({ numberOfGuests, numberOfRooms }: ApartmentAdDetailsProps): ApartmentAdDetailsVO;
    get numberOfGuests(): number;
    protected validate(props: ApartmentAdDetailsProps): void;
}
