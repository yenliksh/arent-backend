import { ShortTermRentBookingTypeVO } from '@domain-value-objects/rent-booking-type.value-object';
import { RentalDateGuard } from '@domains/contract/base-classes/rental-guards/rental-date.guard';
import { ShortTermRentBookingType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { Entity } from '@libs/ddd/domain/base-classes/entity.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { DateUtil } from '@libs/utils/date-util';

import { CostAndCurrencyVO } from '../../../../domain-value-objects/cost-and-currency.value-object';
import { ApartmentAdPauseError } from '../errors/apartment-ad-pause.error';
import { ApartmentAdPublishError } from '../errors/apartment-ad-publish.errors';
import { ApartmentAdHasEmptyFieldsError } from '../errors/apartment-ad.errors';
import { ApartmentAdStatusType } from '../types';
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

export class ShortTermRentEntity extends Entity<ShortTermRentProps> {
  protected readonly _id: UUID;

  static create({ apartmentAdId, cost }: CreateShortTermRentProps): ShortTermRentEntity {
    const id = UUID.generate();

    const props: ShortTermRentProps = {
      apartmentAdId,
      costAndCurrency: CostAndCurrencyVO.create({
        cost,
      }),
      isApproved: false,
      status: ApartmentAdStatusVO.create({ statusType: [ApartmentAdStatusType.DRAFT] }),
      rentBookingType: ShortTermRentBookingTypeVO.create(ShortTermRentBookingType.REQUEST),
      lockedDates: [],
      bookingAccessInMonths: new BookingAccessInMonthVO({ value: 3 }),
    };

    const shortTermRent = new ShortTermRentEntity({ id, props });

    return shortTermRent;
  }

  get id() {
    return this._id;
  }

  get isPublished() {
    return this.props.status.isPublished;
  }

  get isApproved() {
    return this.props.isApproved;
  }

  public get apartmentAdId() {
    return this.props.apartmentAdId;
  }

  public get costAndCurrency() {
    return this.props.costAndCurrency;
  }

  get cancellationPolicy(): ShortTermRentCancellationPolicyType | undefined {
    return this.props.cancellationPolicy?.value;
  }

  get arrivalTime() {
    return this.props.arrivalAndDepartureTime?.arrivalTime;
  }

  get departureTime() {
    return this.props.arrivalAndDepartureTime?.departureTime;
  }

  get rentBookingType(): ShortTermRentBookingType {
    return this.props.rentBookingType.value;
  }

  get status() {
    return this.props.status;
  }

  setCost(cost: number) {
    this.props.costAndCurrency = CostAndCurrencyVO.create({
      cost,
    });
  }

  setArrivalAndDepartureTime({ arrivalTime, departureTime }: { arrivalTime: string; departureTime: string }) {
    const [arrivalHourString, arrivalMinString] = arrivalTime.split(':');
    const [departureHourString, departureMinString] = departureTime.split(':');

    const arrivalDate = DateUtil.utcNow()
      .startOf('day')
      .set('hour', Number(arrivalHourString))
      .set('minute', Number(arrivalMinString))
      .toISOString();

    const departureDate = DateUtil.utcNow()
      .startOf('day')
      .set('hour', Number(departureHourString))
      .set('minute', Number(departureMinString))
      .toISOString();

    RentalDateGuard.validateTimeOrThrowError({
      arrivalDate,
      departureDate,
    });

    this.props.arrivalAndDepartureTime = ArrivalAndDepartureTimeVO.create({ arrivalTime, departureTime });
  }

  setCancelationPolicy(type: ShortTermRentCancellationPolicyType) {
    this.props.cancellationPolicy = ShortTermRentCancellationPolicyVO.create(type);
  }

  setRentBookingType(type: ShortTermRentBookingType) {
    this.props.rentBookingType = ShortTermRentBookingTypeVO.create(type);
  }

  sendToApprove() {
    if (this.props.isApproved) {
      this.props.status = ApartmentAdStatusVO.create({
        statusType: [...new Set([...this.props.status.statusType])],
        declineReason: null,
      });
      return this;
    }

    if (this.props.status.isDraft) {
      this.props.status = ApartmentAdStatusVO.create({
        statusType: [ApartmentAdStatusType.PROCESSING],
        declineReason: null,
      });
      return this;
    }
  }

  setAvailabilitySettings({ lockedDates, bookingAccessInMonths }: AvailabilitySettingsEditProps) {
    this.props.lockedDates = lockedDates.map((i) =>
      ShortTermRentLockedDateEntity.create({ ...i, shortTermRentId: this.id.value }),
    );

    this.props.bookingAccessInMonths = new BookingAccessInMonthVO({ value: bookingAccessInMonths });
  }

  pause() {
    if (this.props.isApproved && this.props.status.isPublished) {
      this.props.status = ApartmentAdStatusVO.create({
        statusType: [ApartmentAdStatusType.PAUSED],
        declineReason: this.props.status.declineReason,
      });
      return this;
    }

    throw new ApartmentAdPauseError();
  }

  publish() {
    if (this.props.isApproved && this.props.status.isPaused) {
      this.props.status = ApartmentAdStatusVO.create({
        statusType: [ApartmentAdStatusType.PUBLISHED],
        declineReason: this.props.status.declineReason,
      });
      return this;
    }

    throw new ApartmentAdPublishError();
  }

  approve() {
    if (this.props.isApproved && this.props.status.isProcessing) {
      // TODO: merge copied values to main object
    }

    if (this.props.status.isProcessing) {
      this.props.status = ApartmentAdStatusVO.create({
        statusType: [ApartmentAdStatusType.PUBLISHED],
      });
      this.props.isApproved = true;
      return this;
    }

    throw new ApartmentAdPublishError();
  }

  reject(declineReason: string) {
    if (this.props.status.isProcessing) {
      this.props.status = ApartmentAdStatusVO.create({
        statusType: [ApartmentAdStatusType.DRAFT],
        declineReason,
      });
      return this;
    }

    throw new ApartmentAdPublishError();
  }

  get isPublishable() {
    const {
      apartmentAdId,
      costAndCurrency,
      status,
      rentBookingType,
      isApproved,
      arrivalAndDepartureTime,
      cancellationPolicy,
    } = this.props;

    const fields = [
      apartmentAdId,
      costAndCurrency,
      status,
      rentBookingType,
      isApproved,
      arrivalAndDepartureTime,
      cancellationPolicy,
    ];

    if (fields.some((f) => f == null)) {
      return false;
    }

    return true;
  }

  validate(): void {
    const {
      apartmentAdId,
      costAndCurrency: { cost, currency },
      status,
      rentBookingType,
    } = this.props;

    const fields = [apartmentAdId, cost, currency, status, rentBookingType];

    if (fields.some((f) => f == null)) {
      throw new ApartmentAdHasEmptyFieldsError('Short term rent must to have complete all required fields');
    }
  }
}
