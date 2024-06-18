import { IGuests } from '@domain-value-objects/apartment-guests.value-object';
export declare class ApartmentGuestsModel implements IGuests {
    numberOfChildren: number;
    numberOfAdult: number;
    numberOfPets: number;
    static create(props: IGuests): ApartmentGuestsModel;
}
