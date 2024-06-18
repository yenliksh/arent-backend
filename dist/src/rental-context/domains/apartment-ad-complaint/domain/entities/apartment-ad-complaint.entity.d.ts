import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { AdComplaintType } from '../types';
import { AdComplaintVO } from '../value-objects/ad-complaint.value-object';
export interface CreateComplaintProps {
    userId: string;
    apartmentAdId: string;
    cause: AdComplaintType[];
    reason?: string;
}
export interface ComplaintProps {
    userId: UUID;
    apartmentAdId: UUID;
    complaint: AdComplaintVO;
    isViewed: boolean;
}
export declare class ApartmentAdComplaintEntity extends AggregateRoot<ComplaintProps> {
    protected _id: UUID;
    static create(createProps: CreateComplaintProps): ApartmentAdComplaintEntity;
    get id(): UUID;
    get apartmentAdId(): UUID;
    get complaint(): AdComplaintVO;
    adminViewed(): this;
    validate(): void;
}
