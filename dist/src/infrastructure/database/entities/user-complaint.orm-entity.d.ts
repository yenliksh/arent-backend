import { UserComplaintType } from '@domains/user-complaint/domain/types';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { UserOrmEntity } from './user.orm-entity';
export declare class UserComplaintOrmEntity extends ObjectionEntityBase {
    static create(data: Omit<UserComplaintOrmEntity, keyof Model>): UserComplaintOrmEntity;
    static tableName: string;
    senderUserId: string;
    recipientUserId: string;
    type: UserComplaintType[];
    reason?: string | null;
    sender?: UserOrmEntity;
    landlord?: UserOrmEntity;
    isViewed: boolean;
    static relationMappings: RelationMappingsThunk;
}
