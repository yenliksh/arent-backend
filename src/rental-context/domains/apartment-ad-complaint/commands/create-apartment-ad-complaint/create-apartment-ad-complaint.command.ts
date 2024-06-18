import { CreateApartmentAdComplaintRequest } from './create-apartment-ad-complaint.request.dto';

export class CreateApartmentAdComplaintCommand {
  public constructor(public readonly userId: string, public readonly input: CreateApartmentAdComplaintRequest) {}
}
