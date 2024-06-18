import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { ShortTermRentBookingType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { ApartmentAdStatusType, CurrencyType } from '../domain/types';
import { ApartmentAdModel, ApartmentAdViewModel } from './apartment-ad.model';
import { ApartmentAdLockedDatesModel } from './sub-models/apartment-ad-locked-dates.model';
export declare class BaseApartmentAdShortTermRentModel extends ModelBase {
    protected constructor(props: ShortTermRentOrmEntity);
    cost: string;
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
    lockedDates: ApartmentAdLockedDatesModel[];
}
export declare class ApartmentAdShortTermRentModel extends BaseApartmentAdShortTermRentModel {
    constructor(props: ShortTermRentOrmEntity);
    apartmentAd?: ApartmentAdModel;
    static create(props: ShortTermRentOrmEntity): ApartmentAdShortTermRentModel;
}
export declare class ApartmentAdShortTermRentViewModel extends BaseApartmentAdShortTermRentModel {
    constructor(props: ShortTermRentOrmEntity);
    apartmentAd?: ApartmentAdViewModel;
    static create(props: ShortTermRentOrmEntity): ApartmentAdShortTermRentModel;
}
