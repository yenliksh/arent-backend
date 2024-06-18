import { ApartmentAdTypeormEntity } from '@modules/admin-panel/apartment-ads/entities/apartment-ad.typeorm-entity';
import { ApartmentAdStatusType, CurrencyType } from 'src/rental-context/domains/apartment-ad/domain/types';
export declare class LongTermRentTypeormEntity {
    static tableName: string;
    id: string;
    cost: number;
    currency: CurrencyType;
    status: ApartmentAdStatusType[];
    isApproved: boolean;
    declineReason?: string;
    ownershipDocuments?: string[];
    apartmentAdId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    apartmentAd?: ApartmentAdTypeormEntity;
}
