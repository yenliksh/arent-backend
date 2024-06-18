import { UserComplaintType } from '@domains/user-complaint/domain/types';
export declare class CreateUserComplaintRequest {
    readonly recipientUserId: string;
    readonly cause: UserComplaintType[];
    readonly reason?: string;
}
