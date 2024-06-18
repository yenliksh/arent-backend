import { UserComplaintType } from '@domains/user-complaint/domain/types';
import { UserComplaintVO } from '@domains/user-complaint/domain/value-objects/user-complaint.value-object';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export interface CreateUserComplaintProps {
    senderUserId: string;
    recipientUserId: string;
    cause: UserComplaintType[];
    reason?: string;
}
export interface UserComplaintProps {
    senderUserId: UUID;
    recipientUserId: UUID;
    complaint: UserComplaintVO;
    isViewed: boolean;
}
export declare class UserComplaintEntity extends AggregateRoot<UserComplaintProps> {
    protected _id: UUID;
    static create(createProps: CreateUserComplaintProps): UserComplaintEntity;
    get id(): UUID;
    get recipientUserId(): UUID;
    get complaint(): UserComplaintVO;
    adminViewed(): this;
    validate(): void;
}
