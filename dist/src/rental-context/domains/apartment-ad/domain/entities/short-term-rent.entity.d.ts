import { ShortTermRentBookingTypeVO } from '@domain-value-objects/rent-booking-type.value-object';
import { ShortTermRentBookingType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { Entity } from '@libs/ddd/domain/base-classes/entity.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { CostAndCurrencyVO } from '../../../../domain-value-objects/cost-and-currency.value-object';
import { ApartmentAdStatusVO } from '../value-objects/apartment-ad-status.value-object';
import { ArrivalAndDepartureTimeVO } from '../value-objects/arrival-and-departure-time.value-object';
import { BookingAccessInMonthVO } from '../value-objects/booking-access-in-month.value-object';
import { ShortTermRentCancellationPolicyVO } from '../value-objects/short-term-rent-cancellation-policy.value-object';
import { AvailabilitySettingsEditProps } from './apartment-ad.types';
import { ShortTermRentLockedDateEntity } from './short-term-rent-locked-date.entity';
export interface CreateShortTermRentProps {
    apartmentAdId: UUID;
    cost: number;
}
export interface ShortTermRentProps {
    apartmentAdId: UUID;
    costAndCurrency: CostAndCurrencyVO;
    status: ApartmentAdStatusVO;
    rentBookingType: ShortTermRentBookingTypeVO;
    isApproved: boolean;
    arrivalAndDepartureTime?: ArrivalAndDepartureTimeVO;
    cancellationPolicy?: ShortTermRentCancellationPolicyVO;
    lockedDates: ShortTermRentLockedDateEntity[];
    bookingAccessInMonths?: BookingAccessInMonthVO;
}
export declare class ShortTermRentEntity extends Entity<ShortTermRentProps> {
    protected readonly _id: UUID;
    static create({ apartmentAdId, cost }: CreateShortTermRentProps): ShortTermRentEntity;
    get id(): UUID;
    get isPublished(): boolean;
    get isApproved(): boolean;
    get apartmentAdId(): UUID;
    get costAndCurrency(): CostAndCurrencyVO;
    get cancellationPolicy(): ShortTermRentCancellationPolicyType | undefined;
    get arrivalTime(): string | undefined;
    get departureTime(): string | undefined;
    get rentBookingType(): ShortTermRentBookingType;
    get status(): ApartmentAdStatusVO;
    setCost(cost: number): void;
    setArrivalAndDepartureTime({ arrivalTime, departureTime }: {
        arrivalTime: string;
        departureTime: string;
    }): void;
    setCancelationPolicy(type: ShortTermRentCancellationPolicyType): void;
    setRentBookingType(type: ShortTermRentBookingType): void;
    sendToApprove(): this | undefined;
    setAvailabilitySettings({ lockedDates, bookingAccessInMonths }: AvailabilitySettingsEditProps): void;
    pause(): this;
    publish(): this;
    approve(): this;
    reject(declineReason: string): this;
    get isPublishable(): boolean;
    validate(): void;
}
