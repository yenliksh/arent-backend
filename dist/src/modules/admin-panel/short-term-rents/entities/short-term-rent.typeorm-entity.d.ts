import { ShortTermRentBookingType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ApartmentAdTypeormEntity } from '@modules/admin-panel/apartment-ads/entities/apartment-ad.typeorm-entity';
import { ApartmentAdStatusType, CurrencyType } from 'src/rental-context/domains/apartment-ad/domain/types';
export declare class ShortTermRentTypeormEntity {
    static tableName: string;
    id: string;
    cost: number;
    currency: CurrencyType;
    status: ApartmentAdStatusType[];
    isApproved: boolean;
    declineReason?: string;
    apartmentAdId: string;
    rentBookingType: ShortTermRentBookingType;
    cancellationPolicy?: ShortTermRentCancellationPolicyType;
    arrivalTime?: string;
    departureTime?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    apartmentAd?: ApartmentAdTypeormEntity;
}
