import { ApartmentCategory, ApartmentType } from 'src/rental-context/domains/apartment-ad/domain/types';
export declare class EditApartmentAdTypeRequest {
    readonly id: string;
    readonly apartmentCategory: ApartmentCategory;
    readonly apartmentType?: ApartmentType | null;
}
