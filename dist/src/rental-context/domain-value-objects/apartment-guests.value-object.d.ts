import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface IGuests {
    numberOfChildren: number;
    numberOfAdult: number;
    numberOfPets: number;
}
export interface ApartmentGuestsCreateProps {
    numberOfChildren?: number;
    numberOfAdult?: number;
    numberOfPets?: number;
}
export declare class ApartmentGuestsVO extends ValueObject<IGuests> {
    constructor(props: IGuests);
    static create(props: ApartmentGuestsCreateProps): ApartmentGuestsVO;
    protected validate(props: IGuests): void;
    static transform(props: ApartmentGuestsCreateProps): IGuests;
}
