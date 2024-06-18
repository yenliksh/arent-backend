import { UserComplaintType } from '@domains/user-complaint/domain/types';
export declare class UserComplaintTypeormEntity {
    static tableName: string;
    id: string;
    senderUserId: string;
    recipientUserId: string;
    type: UserComplaintType[];
    reason: string;
    isViewed: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
