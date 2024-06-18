import { AdComplaintType } from '@domains/apartment-ad-complaint/domain/types';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { ApartmentAdOrmEntity } from './apartment-ad.orm-entity';
import { UserOrmEntity } from './user.orm-entity';
export declare class ApartmentAdComplaintOrmEntity extends ObjectionEntityBase {
    static create(data: Omit<ApartmentAdComplaintOrmEntity, keyof Model>): ApartmentAdComplaintOrmEntity;
    static tableName: string;
    userId: string;
    apartmentAdId: string;
    type: AdComplaintType[];
    reason?: string | null;
    apartmentAd?: ApartmentAdOrmEntity;
    user?: UserOrmEntity;
    isViewed: boolean;
    static relationMappings: RelationMappingsThunk;
}
