import { CreateUserComplaintRequest } from './create-user-complaint.request.dto';

export class CreateUserComplaintCommand {
  public constructor(public readonly senderUserId: string, public readonly input: CreateUserComplaintRequest) {}
}
