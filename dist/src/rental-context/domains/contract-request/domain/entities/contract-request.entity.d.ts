import { ShortTermRentBookingTypeVO } from '@domain-value-objects/rent-booking-type.value-object';
import { ShortTermRentPaymentTypeVO } from '@domain-value-objects/short-term-rent-payment-type.value-object';
import { RentPeriodVersionEntity } from '@domains/rent-period-version/domain/rent-period-version.entity';
import { ApartmentRentPeriodType, ShortTermRentBookingType } from '@infrastructure/enums';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ApartmentGuestsVO } from '../../../../domain-value-objects/apartment-guests.value-object';
import { ContractRequestStatusVO } from '../value-objects/request-status.value-object';
export interface CreateRequestContractProps {
    tenantId?: UUID;
    apartmentAdId?: UUID;
    apartmentRentPeriodType: ApartmentRentPeriodType;
    landlordId?: UUID;
    arrivalDate?: DateTimeISOTZVO;
    departureDate?: DateTimeISOTZVO;
    comment?: string;
    status: ContractRequestStatusVO;
    guests: ApartmentGuestsVO;
    rentPeriodVersion: RentPeriodVersionEntity;
    shortTermRentBookingType?: ShortTermRentBookingTypeVO;
    shortTermRentPaymentType?: ShortTermRentPaymentTypeVO;
}
export declare type ContractRequestProps = CreateRequestContractProps & {
    rejectReason?: string;
};
export declare class ContractRequestEntity extends AggregateRoot<ContractRequestProps> {
    protected readonly _id: UUID;
    static create({ apartmentAdId, tenantId, apartmentRentPeriodType, landlordId, guests, arrivalDate, departureDate, status, comment, rentPeriodVersion, shortTermRentBookingType, shortTermRentPaymentType, }: CreateRequestContractProps): ContractRequestEntity;
    accept(): void;
    reject(reason: string): void;
    rejectInstant(): void;
    getRequiredDataForContract(): {
        apartmentRentPeriodType: ApartmentRentPeriodType;
        arrivalDate: DateTimeISOTZVO | undefined;
        departureDate: DateTimeISOTZVO | undefined;
        apartmentAdId: UUID;
        tenantId: UUID;
        shortTermRentBookingType: ShortTermRentBookingTypeVO | undefined;
        shortTermRentPaymentType: ShortTermRentPaymentTypeVO | undefined;
        guests: ApartmentGuestsVO;
        landlordId: UUID;
        rentPeriodVersion: RentPeriodVersionEntity;
    };
    get id(): UUID;
    get comment(): string | undefined;
    get apartmentRentPeriodType(): ApartmentRentPeriodType;
    get dates(): {
        arrivalDate: string | undefined;
        departureDate: string | undefined;
    };
    get shortTermRentBookingType(): ShortTermRentBookingType | undefined;
    get tenantIdOrFail(): UUID;
    validate(): void;
    private validateShortTermRent;
    private validateLongTermRent;
    private validateActiveRequiredFields;
    private validateShortTermRentPeriod;
}
