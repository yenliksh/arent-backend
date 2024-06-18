import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { IdResponse } from '../dtos/id.response.dto';
export declare class ModelBase extends IdResponse {
    constructor(entity: ObjectionEntityBase);
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly deletedAt?: string;
}
