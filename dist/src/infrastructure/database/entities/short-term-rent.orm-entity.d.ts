import { ShortTermRentBookingType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { ApartmentAdStatusType, CurrencyType } from 'src/rental-context/domains/apartment-ad/domain/types';
import { ApartmentAdOrmEntity } from './apartment-ad.orm-entity';
import { ShortTermRentLockedDateOrmEntity } from './short-term-rent-locked-dates.orm-entity';
export declare class ShortTermRentOrmEntity extends ObjectionEntityBase {
    static create(data: Omit<ShortTermRentOrmEntity, keyof Model>): ShortTermRentOrmEntity;
    static tableName: string;
    cost: number;
    currency: CurrencyType;
    apartmentAdId: string;
    rentBookingType: ShortTermRentBookingType;
    status: ApartmentAdStatusType[];
    isApproved: boolean;
    declineReason?: string | null;
    cancellationPolicy?: ShortTermRentCancellationPolicyType;
    arrivalTime?: string;
    departureTime?: string;
    bookingAccessInMonths?: number;
    apartmentAd?: ApartmentAdOrmEntity;
    lockedDates?: ShortTermRentLockedDateOrmEntity[];
    static relationMappings: RelationMappingsThunk;
}
