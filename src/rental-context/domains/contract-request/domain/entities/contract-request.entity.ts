import { ShortTermRentBookingTypeVO } from '@domain-value-objects/rent-booking-type.value-object';
import { ShortTermRentPaymentTypeVO } from '@domain-value-objects/short-term-rent-payment-type.value-object';
import { RentalDateGuard } from '@domains/contract/base-classes/rental-guards/rental-date.guard';
import { RentPeriodVersionEntity } from '@domains/rent-period-version/domain/rent-period-version.entity';
import { ApartmentRentPeriodType, ShortTermRentBookingType, ShortTermRentPaymentType } from '@infrastructure/enums';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { Guard } from '@libs/ddd/domain/guard';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException, ArgumentNotProvidedException } from '@libs/exceptions';
import { DateUtil } from '@libs/utils/date-util';
import { SHORT_RENT_PARTIAL_ALLOWED_DAYS_BEFORE_ARRIVAL } from 'src/rental-context/constants';

import { ApartmentGuestsVO } from '../../../../domain-value-objects/apartment-guests.value-object';
import {
  ContractRequestHasEmptyFieldsError,
  ContractRequestHasNullRequiredFieldsError,
} from '../errors/contract-request.errors';
import { ContractRequestStatus } from '../types';
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

export type ContractRequestProps = CreateRequestContractProps & {
  rejectReason?: string;
};

export class ContractRequestEntity extends AggregateRoot<ContractRequestProps> {
  protected readonly _id: UUID;

  static create({
    apartmentAdId,
    tenantId,
    apartmentRentPeriodType,
    landlordId,
    guests,
    arrivalDate,
    departureDate,
    status,
    comment,
    rentPeriodVersion,
    shortTermRentBookingType,
    shortTermRentPaymentType,
  }: CreateRequestContractProps): ContractRequestEntity {
    const id = UUID.generate();

    const props: ContractRequestProps = {
      apartmentAdId,
      tenantId,
      apartmentRentPeriodType,
      landlordId,
      guests,
      status,
      arrivalDate,
      departureDate,
      comment,
      rentPeriodVersion,
      shortTermRentBookingType,
      shortTermRentPaymentType,
    };

    const contract = new ContractRequestEntity({ id, props });

    return contract;
  }

  accept() {
    const { status, tenantId, apartmentAdId, landlordId, shortTermRentBookingType } = this.props;

    if (status.value !== ContractRequestStatus.CREATED) {
      throw new ArgumentInvalidException(`You can accept request if status = ${ContractRequestStatus.CREATED} only`);
    }

    if (shortTermRentBookingType?.value === ShortTermRentBookingType.INSTANT) {
      throw new ArgumentNotProvidedException('You can not accept instant booking request');
    }

    if (!tenantId || !apartmentAdId || !landlordId) {
      throw new ContractRequestHasNullRequiredFieldsError();
    }

    this.props.status = ContractRequestStatusVO.create(ContractRequestStatus.ACCEPTED);

    this.validate();
  }

  reject(reason: string) {
    const { status, shortTermRentBookingType } = this.props;

    if (status.value !== ContractRequestStatus.CREATED) {
      throw new ArgumentInvalidException(`You can reject request if status = ${ContractRequestStatus.CREATED} only`);
    }

    if (shortTermRentBookingType?.value === ShortTermRentBookingType.INSTANT) {
      throw new ArgumentNotProvidedException('You can not reject instant booking request');
    }

    this.props.status = ContractRequestStatusVO.create(ContractRequestStatus.REJECTED);
    this.props.rejectReason = reason;

    this.validate();
  }

  rejectInstant() {
    const { shortTermRentBookingType } = this.props;

    if (shortTermRentBookingType?.value !== ShortTermRentBookingType.INSTANT) {
      throw new ArgumentInvalidException(
        `System can reject instant request if shortTermRentBookingType = ${ShortTermRentBookingType.INSTANT} only`,
      );
    }

    this.props.status = ContractRequestStatusVO.create(ContractRequestStatus.REJECTED);

    this.validate();
  }

  getRequiredDataForContract() {
    const {
      apartmentRentPeriodType,
      arrivalDate,
      departureDate,
      apartmentAdId,
      tenantId,
      shortTermRentBookingType,
      shortTermRentPaymentType,
      guests,
      landlordId,
      rentPeriodVersion,
    } = this.props;

    if (!tenantId || !landlordId || !apartmentAdId || !rentPeriodVersion) {
      throw new ContractRequestHasEmptyFieldsError('Active contract request must to have complete all required fields');
    }

    return {
      apartmentRentPeriodType,
      arrivalDate,
      departureDate,
      apartmentAdId,
      tenantId,
      shortTermRentBookingType,
      shortTermRentPaymentType,
      guests,
      landlordId,
      rentPeriodVersion,
    };
  }

  get id() {
    return this._id;
  }

  get comment() {
    return this.props.comment;
  }

  get apartmentRentPeriodType() {
    return this.props.apartmentRentPeriodType;
  }

  get dates() {
    const { arrivalDate, departureDate } = this.props;

    return { arrivalDate: arrivalDate?.value, departureDate: departureDate?.value };
  }

  get shortTermRentBookingType() {
    return this.props.shortTermRentBookingType?.value;
  }

  get tenantIdOrFail() {
    if (!this.props.tenantId) {
      throw new ContractRequestHasEmptyFieldsError('Tenant id required');
    }

    return this.props.tenantId;
  }

  validate(): void {
    const { status, tenantId, apartmentRentPeriodType, landlordId, guests, rejectReason } = this.props;

    const fields = [status, apartmentRentPeriodType, guests];

    if (fields.some((f) => f == null)) {
      throw new ContractRequestHasEmptyFieldsError('Contract must to have complete all required fields');
    }
    if (tenantId && tenantId.equals(landlordId)) {
      throw new ArgumentInvalidException('TenantId must be not equals landlordId');
    }
    if (status.value !== ContractRequestStatus.REJECTED && rejectReason) {
      throw new ArgumentInvalidException(`Reject reason required only for status = ${ContractRequestStatus.REJECTED}`);
    }

    this.validateLongTermRent();
    this.validateShortTermRent();
    this.validateActiveRequiredFields();
  }

  private validateShortTermRent() {
    const { apartmentRentPeriodType, arrivalDate, departureDate, shortTermRentBookingType, shortTermRentPaymentType } =
      this.props;

    if (apartmentRentPeriodType !== ApartmentRentPeriodType.SHORT_TERM) {
      return;
    }

    if (!arrivalDate || !departureDate) {
      throw new ContractRequestHasEmptyFieldsError('ArrivalDate and departureDate required for short term rent period');
    }
    if (!Guard.isDateMoreThan(arrivalDate.value, departureDate.value)) {
      throw new ContractRequestHasEmptyFieldsError('End date must be more that start date');
    }
    if (!shortTermRentBookingType) {
      throw new ArgumentInvalidException('Rent booking type required for short term rent period');
    }
    if (!shortTermRentPaymentType) {
      throw new ArgumentInvalidException('Rent payment type required for short term rent period');
    }

    // for short term rent only
    this.validateShortTermRentPeriod(arrivalDate, departureDate);
  }

  private validateLongTermRent() {
    const {
      apartmentRentPeriodType,
      comment,
      arrivalDate,
      departureDate,
      shortTermRentBookingType,
      shortTermRentPaymentType,
    } = this.props;

    if (apartmentRentPeriodType !== ApartmentRentPeriodType.LONG_TERM) {
      return;
    }

    if (comment) {
      throw new ArgumentInvalidException('Comment available only for short term rent');
    }
    if (arrivalDate || departureDate) {
      throw new ArgumentInvalidException('Arrival and departure dates available only for short term rent');
    }
    if (shortTermRentBookingType) {
      throw new ArgumentInvalidException('Rent booking type available only for short term rent period');
    }
    if (shortTermRentPaymentType) {
      throw new ArgumentInvalidException('Rent payment type available only for short term rent period');
    }
  }

  private validateActiveRequiredFields() {
    const { status, tenantId, landlordId, apartmentAdId, rentPeriodVersion } = this.props;

    if (status.value !== ContractRequestStatus.CREATED) {
      return;
    }

    if (!tenantId) {
      throw new ContractRequestHasEmptyFieldsError('Tenant id required');
    }
    if (!landlordId) {
      throw new ContractRequestHasEmptyFieldsError('Landlord id required');
    }
    if (!apartmentAdId) {
      throw new ContractRequestHasEmptyFieldsError('Apartment ad id required');
    }
    if (!rentPeriodVersion) {
      throw new ContractRequestHasEmptyFieldsError('Rent period version required');
    }
  }

  // for short term rent only
  private validateShortTermRentPeriod(arrivalDate: DateTimeISOTZVO, departureDate: DateTimeISOTZVO) {
    const { rentPeriodVersion, apartmentRentPeriodType, shortTermRentPaymentType } = this.props;
    const paymentDateGuard = new RentalDateGuard(rentPeriodVersion);

    const paymentStrategyType = paymentDateGuard.defineRentPeriodStrategyType(
      {
        arrivalDate: arrivalDate.value,
        departureDate: departureDate.value,
      },
      apartmentRentPeriodType,
    );

    if (shortTermRentPaymentType?.value === ShortTermRentPaymentType.PARTIAL) {
      RentalDateGuard.mustBeDaysBeforeArrival(
        DateUtil.utcNow().toISOString(),
        arrivalDate.value,
        SHORT_RENT_PARTIAL_ALLOWED_DAYS_BEFORE_ARRIVAL,
      );
    }

    paymentDateGuard.validateOrThrowError(
      { arrivalDate: arrivalDate.value, departureDate: departureDate.value },
      paymentStrategyType,
    );
  }
}
