import { CreateUserComplaintRequest } from './create-user-complaint.request.dto';
export declare class CreateUserComplaintCommand {
    readonly senderUserId: string;
    readonly input: CreateUserComplaintRequest;
    constructor(senderUserId: string, input: CreateUserComplaintRequest);
}
