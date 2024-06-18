import { AdComplaintType } from '@domains/apartment-ad-complaint/domain/types';
export declare class ApartmentAdComplaintTypeormEntity {
    static tableName: string;
    id: string;
    userId: string;
    apartmentAdId: string;
    type: AdComplaintType;
    reason: string;
    isViewed: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
