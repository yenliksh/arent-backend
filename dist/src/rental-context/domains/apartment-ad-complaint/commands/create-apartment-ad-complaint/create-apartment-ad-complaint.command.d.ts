import { CreateApartmentAdComplaintRequest } from './create-apartment-ad-complaint.request.dto';
export declare class CreateApartmentAdComplaintCommand {
    readonly userId: string;
    readonly input: CreateApartmentAdComplaintRequest;
    constructor(userId: string, input: CreateApartmentAdComplaintRequest);
}
