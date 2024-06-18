import { Model } from 'objection';
export declare class ObjectionEntityBase extends Model {
    id: string;
    updatedAt: Date;
    createdAt: Date;
    deletedAt?: Date;
}
