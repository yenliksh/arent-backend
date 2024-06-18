import { AdComplaintType } from '@domains/apartment-ad-complaint/domain/types';
export declare class CreateApartmentAdComplaintRequest {
    readonly apartmentAdId: string;
    readonly cause: AdComplaintType[];
    readonly reason?: string;
}
