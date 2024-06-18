import { AddressCreateProps, AddressVO } from '@domain-value-objects/address.value-object';
import {
  ApartmentAdCharacteristicsProps,
  ApartmentAdCharacteristicsVO,
} from '@domain-value-objects/apartment-characteristics.value-object';
import { IGuests } from '@domain-value-objects/apartment-guests.value-object';
import { ApartmentRulesVO } from '@domain-value-objects/apartment-rules.value-object';
import {
  ApartmentRentPeriodType,
  LongTermRentCancellationPolicyType,
  ShortTermRentBookingType,
  ShortTermRentCancellationPolicyType,
} from '@infrastructure/enums';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ArgumentInvalidException, ArgumentOutOfRangeException } from '@libs/exceptions';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';
import { DateUtil } from '@libs/utils/date-util';

import { PaymentMethodProps, PaymentMethodVO } from '../../../../domain-value-objects/payment-method.value-object';
import { ApartmentAdGuard } from '../apartment-ad.guard';
import { ApartmentAdPauseError } from '../errors/apartment-ad-pause.error';
import { ApartmentAdPublishError } from '../errors/apartment-ad-publish.errors';
import { ApartmentAdTermPeriodError } from '../errors/apartment-ad-term-period.errors';
import { ApartmentAdHasEmptyFieldsError } from '../errors/apartment-ad.errors';
import { LongTermRentError } from '../errors/long-term-rent.errors';
import { AdEditActions, ApartmentCategory, ApartmentType, LegalCapacityType, RentPeriodType } from '../types';
import {
  ApartmentAdDescriptionProps,
  ApartmentAdDescriptionVO,
} from '../value-objects/apartment-ad-description.value-object';
import { ApartmentAdDetailsProps, ApartmentAdDetailsVO } from '../value-objects/apartment-ad-details.value-object';
import { ApartmentCategoryVO } from '../value-objects/apartment-category.value-objects';
import { ApartmentTypeVO } from '../value-objects/apartment-type.value-object';
import { LegalCapacityVO } from '../value-objects/legal-capacity.value-object';
import { MediaVO } from '../value-objects/media.value-object';
import { RentPeriodTypeVO } from '../value-objects/rent-period-type.value-object';
import {
  ApartmentAdCreateProps,
  ApartmentAdEditProps,
  ApartmentAdProps,
  AvailabilitySettingsEditProps,
  ILockedDate,
  ImportantInfoSetProps,
} from './apartment-ad.types';
import { LongTermRentEntity } from './long-term-rent.entity';
import { ShortTermRentEntity } from './short-term-rent.entity';

const TOTAL_STEPS = 7;

export class ApartmentAdEntity extends AggregateRoot<ApartmentAdProps> {
  protected readonly _id: UUID;

  static create({
    landlordId,
    rentPeriodType,
    shortTermRentCost,
    longTermRentCost,
    slug,
  }: ApartmentAdCreateProps): ApartmentAdEntity {
    const id = UUID.generate();

    const props: ApartmentAdProps = {
      landlordId,
      apartmentCategory: ApartmentCategoryVO.create(ApartmentCategory.FLAT),
      apartmentType: ApartmentTypeVO.create(ApartmentType.FLAT),
      legalCapacity: LegalCapacityVO.create({ type: LegalCapacityType.INDIVIDUAL }),
      rentPeriodType: RentPeriodTypeVO.create(rentPeriodType),
      longTermRent: longTermRentCost
        ? LongTermRentEntity.create({
            apartmentAdId: UUID.generate(),
            cost: longTermRentCost,
          })
        : undefined,
      shortTermRent: shortTermRentCost
        ? ShortTermRentEntity.create({
            apartmentAdId: UUID.generate(),
            cost: shortTermRentCost,
          })
        : undefined,
      completeStep: 1,
      longTermRentAdIsRented: false,
      isUserIdentityApproved: false,
      slug,
    };

    const apartmentAd = new ApartmentAdEntity({ id, props });

    return apartmentAd;
  }

  get id() {
    return this._id;
  }

  get landlordId(): UUID {
    return this.props.landlordId;
  }

  get rules() {
    return this.props.rules;
  }

  get rentPeriodType() {
    return this.props.rentPeriodType;
  }

  get longTermRentIsRented() {
    return this.props.longTermRentAdIsRented;
  }

  get shortTermRentCancellationPolicy(): ShortTermRentCancellationPolicyType | undefined {
    return this.props.shortTermRent?.cancellationPolicy;
  }

  get longTermRentCancellationPolicy(): LongTermRentCancellationPolicyType | undefined {
    return this.props.longTermRent?.cancellationPolicy;
  }

  get isPaymentMethodAttached(): boolean {
    return !!this.props.paymentMethod?.innopayCardId;
  }

  get isAllStepsCreationFilled(): boolean {
    return this.props.completeStep === TOTAL_STEPS;
  }

  get rentBookingType(): ShortTermRentBookingType | undefined {
    return this.props.shortTermRent?.rentBookingType;
  }

  private setStep(step: number) {
    if (step > TOTAL_STEPS) {
      return;
    }

    this.props.completeStep = step <= this.props.completeStep ? this.props.completeStep : step;
  }

  public getCostAndCurrency(type: ApartmentRentPeriodType) {
    let rentEntity: LongTermRentEntity | ShortTermRentEntity | null | undefined;

    if (type === ApartmentRentPeriodType.LONG_TERM) {
      rentEntity = this.props.longTermRent;
    }

    if (type === ApartmentRentPeriodType.SHORT_TERM) {
      rentEntity = this.props.shortTermRent;
    }

    if (!rentEntity) {
      throw new ArgumentInvalidException(`Rent entity does not exist for ${type} rent type`);
    }

    return rentEntity.costAndCurrency;
  }

  getTimezoneOrFail() {
    const timezone = this.props.address?.timezone;

    if (!timezone) {
      throw new ArgumentInvalidException('Timezone required');
    }

    return timezone;
  }

  getDepartureTimeOrFail() {
    const departureTime = this.props.shortTermRent?.departureTime;

    if (!departureTime) {
      throw new ArgumentInvalidException('Departure time required');
    }

    return departureTime;
  }

  getArrivalTimeOrFail() {
    const arrivalTime = this.props.shortTermRent?.arrivalTime;

    if (!arrivalTime) {
      throw new ArgumentInvalidException('Arrival time required');
    }

    return arrivalTime;
  }

  get longTermRentId() {
    return this.props.longTermRent?.id;
  }

  get shortTermRentId() {
    return this.props.shortTermRent?.id;
  }

  private editShortTermRentApartmentAd(shortTermRentCost?: number | null) {
    const editShortTermRentMap: { [P in AdEditActions]: boolean } = {
      ['CREATE']: shortTermRentCost != null && !this.isExistShortTermRent(this.props.shortTermRent),
      ['REMOVE']: shortTermRentCost == null && this.isExistShortTermRent(this.props.shortTermRent),
      ['UPDATE']: shortTermRentCost != null && this.isExistShortTermRent(this.props.shortTermRent),
    };

    let action: AdEditActions | null = null;

    if (editShortTermRentMap.UPDATE) {
      this.props.shortTermRent!.setCost(shortTermRentCost!);
      action = 'UPDATE';
    }

    if (editShortTermRentMap.CREATE) {
      this.props.shortTermRent = ShortTermRentEntity.create({
        apartmentAdId: UUID.generate(),
        cost: shortTermRentCost!,
      });
      action = 'CREATE';
    }

    if (editShortTermRentMap.REMOVE) {
      this.props.shortTermRent = null;
      action = 'REMOVE';
    }

    return action;
  }

  private editLongTermRentApartmentAd(longTermRentCost?: number | null) {
    const editLongTermRentMap: { [P in AdEditActions]: boolean } = {
      ['CREATE']: longTermRentCost != null && !this.isExistLongTermRent(this.props.longTermRent),
      ['REMOVE']: longTermRentCost == null && this.isExistLongTermRent(this.props.longTermRent),
      ['UPDATE']: longTermRentCost != null && this.isExistLongTermRent(this.props.longTermRent),
    };

    let action: AdEditActions | null = null;

    if (editLongTermRentMap.UPDATE) {
      this.props.longTermRent!.setCost(longTermRentCost!);
      action = 'UPDATE';
    }

    if (editLongTermRentMap.CREATE) {
      this.props.longTermRent = LongTermRentEntity.create({
        apartmentAdId: UUID.generate(),
        cost: longTermRentCost!,
      });
      action = 'CREATE';
    }

    if (editLongTermRentMap.REMOVE) {
      this.props.longTermRent = null;
      action = 'REMOVE';
    }

    return action;
  }

  public editShortTermRentAvailability(props: AvailabilitySettingsEditProps) {
    if (!this.isShortTermRent || !this.props.shortTermRent) {
      throw new IllegalOperationException('Availability can only be changed for a short rental period');
    }

    if (!this.shortTermRentStatus?.isPublished) {
      throw new IllegalOperationException('Availability can only be changed for a published short rental period');
    }

    if (this.areIntersected(props.lockedDates)) {
      throw new ArgumentOutOfRangeException('Locked dates can not be intersected or equal between them self');
    }

    this.props.shortTermRent.setAvailabilitySettings(props);
  }

  private areIntersected(lockedDates: ILockedDate[]) {
    const intersectionsResult = lockedDates.map((lockedDate, indexMap) => {
      return lockedDates.reduce((acc, curr, indexReduce) => {
        if (indexMap === indexReduce) {
          return acc;
        }

        return this.isDatesOverlaps(curr, lockedDate);
      }, false);
    });

    return intersectionsResult.some((i) => i == true);
  }

  private isDatesOverlaps(date1: ILockedDate, date2: ILockedDate) {
    return (
      DateUtil.parse(date1.startDate).isBetween(DateUtil.parse(date2.startDate), DateUtil.parse(date2.endDate)) ||
      DateUtil.parse(date1.endDate).isBetween(DateUtil.parse(date2.startDate), DateUtil.parse(date2.endDate)) ||
      DateUtil.parse(date2.startDate).isBetween(DateUtil.parse(date1.startDate), DateUtil.parse(date1.endDate)) ||
      date1.startDate === date2.startDate ||
      date1.endDate === date2.startDate ||
      date2.endDate === date1.endDate
    );
  }

  public editApartmentAd({ rentPeriodType, shortTermRentCost, longTermRentCost }: ApartmentAdEditProps) {
    if (shortTermRentCost == null && longTermRentCost == null) {
      throw new ArgumentInvalidException(
        'While try to edit apartment short term rent cost or long term rent cost must be specified',
      );
    }

    const longTermAction = this.editLongTermRentApartmentAd(longTermRentCost);

    const shortTermAction = this.editShortTermRentApartmentAd(shortTermRentCost);

    this.props.rentPeriodType = RentPeriodTypeVO.create(rentPeriodType);

    this.setStep(1);

    this.validate();

    return { longTermAction, shortTermAction };
  }

  private isExistLongTermRent = (
    longTermRent: LongTermRentEntity | null | undefined,
  ): longTermRent is LongTermRentEntity => {
    return (longTermRent as LongTermRentEntity)?.id !== undefined;
  };

  private isExistShortTermRent = (
    longTermRent: ShortTermRentEntity | null | undefined,
  ): longTermRent is ShortTermRentEntity => {
    return (longTermRent as ShortTermRentEntity)?.id !== undefined;
  };

  public setApartmentType(type: ApartmentType) {
    this.props.apartmentType = ApartmentTypeVO.create(type);

    this.setStep(2);
  }

  public setApartmentCategory(category: ApartmentCategory) {
    this.props.apartmentCategory = ApartmentCategoryVO.create(category);

    this.setStep(2);
  }

  public setDetails(props: ApartmentAdDetailsProps) {
    this.props.details = ApartmentAdDetailsVO.create(props);

    this.setStep(3);
  }

  public setCharacteristics(props: ApartmentAdCharacteristicsProps) {
    this.props.characteristics = ApartmentAdCharacteristicsVO.create(props);
  }

  public setAddress(props: AddressCreateProps) {
    this.props.address = AddressVO.create(props);

    this.setStep(4);
  }

  get isShortTermRentPublished() {
    return !!this.props.shortTermRent?.isPublished;
  }

  public setMedia(urls: string[]) {
    this.props.media = MediaVO.create({ photos: urls });

    this.setStep(5);
  }

  public setDescription(props: ApartmentAdDescriptionProps) {
    this.props.description = ApartmentAdDescriptionVO.create(props);

    this.setStep(6);
  }

  public adminEditDescriptionText(descriptionText: string) {
    if (!this.props.description) {
      // TODO: change to IllegalOperationExeption
      throw new ArgumentInvalidException('Description does not exist for this operation');
    }

    this.props.description = ApartmentAdDescriptionVO.create({
      ...this.props.description.unpack(),
      description: descriptionText,
    });

    return this;
  }

  public adminEditDescriptionName(name: string) {
    if (!this.props.description) {
      // TODO: change to IllegalOperationExeption
      throw new ArgumentInvalidException('Description does not exist for this operation');
    }

    this.props.description = ApartmentAdDescriptionVO.create({
      ...this.props.description.unpack(),
      name,
    });

    return this;
  }

  get isAdHasAllRequirements() {
    const requirements = [
      this.isAllStepsCreationFilled,
      this.props.isUserIdentityApproved,
      this.isPaymentMethodAttached,
    ];

    if (requirements.every((i) => i === true)) {
      return true;
    }

    return true;
  }

  public approveLongTermRent() {
    if (!this.props.longTermRent) {
      throw new ApartmentAdPublishError('Apartment ad should has another rent period type');
    }

    if (!this.isAdHasAllRequirements) {
      throw new IllegalOperationException('Ad does not meet all requirements');
    }

    this.props.longTermRent.approve();
  }

  public rejectLongTermRent(declineReason: string) {
    if (!this.props.longTermRent) {
      throw new ApartmentAdPublishError('Apartment ad should has another rent period type');
    }

    if (!this.isAdHasAllRequirements) {
      throw new IllegalOperationException('Ad does not meet all requirements');
    }

    this.props.longTermRent.reject(declineReason);
  }

  public rejectShortTermRent(declineReason: string) {
    if (!this.props.shortTermRent) {
      throw new ApartmentAdPublishError('Apartment ad should has another rent period type');
    }

    if (!this.isAdHasAllRequirements) {
      throw new IllegalOperationException('Ad does not meet all requirements');
    }

    this.props.shortTermRent.reject(declineReason);
  }

  public approveShortTermRent() {
    if (!this.props.shortTermRent) {
      throw new ApartmentAdPublishError('Apartment ad should have another rent period type');
    }

    if (!this.isAdHasAllRequirements) {
      throw new IllegalOperationException('Ad does not meet all requirements');
    }

    this.props.shortTermRent.approve();
  }

  get isShortTermRent(): boolean {
    return !!this.props.shortTermRent;
  }

  get isLongTermRent(): boolean {
    return !!this.props.longTermRent;
  }

  get longTermRentStatus() {
    return this.props.longTermRent?.status;
  }

  get shortTermRentStatus() {
    return this.props.shortTermRent?.status;
  }

  get baseApartmentAdDataForContract(): { name: string; address: AddressCreateProps } | undefined {
    const description = this.props.description?.unpack();
    const address = this.props.address?.unpackCreatedProps();

    if (!description || !address) {
      return;
    }

    return {
      name: description.name,
      address,
    };
  }

  public setOwnershipDocuments(documents: string[]) {
    if (!this.props.longTermRent) {
      throw new LongTermRentError();
    }

    this.props.longTermRent.setOwnershipDocuments(documents);
  }

  public setPaymentMethod(props: PaymentMethodProps) {
    this.props.paymentMethod = new PaymentMethodVO(props);
  }

  public setImportantInfo({
    allowedToHangingOut,
    allowedToSmoke,
    allowedWithChildren,
    allowedWithPets,
    shortTermRentArrivalTime,
    shortTermRentDepartureTime,
    shortTermRentCancellationPolicyType,
    shortTermRentBookingType,
  }: ImportantInfoSetProps) {
    this.props.rules = ApartmentRulesVO.create({
      allowedToHangingOut,
      allowedToSmoke,
      allowedWithChildren,
      allowedWithPets,
    });

    // TODO: add cancelation policy for long term rent type too (exist only one cancelation policy)

    if (
      this.props.shortTermRent &&
      (!shortTermRentArrivalTime ||
        !shortTermRentDepartureTime ||
        !shortTermRentCancellationPolicyType ||
        !shortTermRentBookingType)
    ) {
      throw new ApartmentAdHasEmptyFieldsError('Short term rent period must have all required fields');
    }

    if (
      this.props.shortTermRent &&
      shortTermRentArrivalTime &&
      shortTermRentDepartureTime &&
      shortTermRentCancellationPolicyType &&
      shortTermRentBookingType
    ) {
      this.props.shortTermRent.setArrivalAndDepartureTime({
        arrivalTime: shortTermRentArrivalTime,
        departureTime: shortTermRentDepartureTime,
      });
      this.props.shortTermRent.setCancelationPolicy(shortTermRentCancellationPolicyType);
      this.props.shortTermRent.setRentBookingType(shortTermRentBookingType);
    }

    this.setStep(7);
  }

  public switchRentBookingType() {
    if (!this.props.shortTermRent) {
      throw new IllegalOperationException('Apartment ad must have short term rent type');
    }

    if (!this.props.shortTermRent.isPublished) {
      throw new IllegalOperationException('Apartment ad must be in published status');
    }

    const rentBookingType = this.props.shortTermRent.rentBookingType;
    if (rentBookingType === ShortTermRentBookingType.INSTANT) {
      this.props.shortTermRent.setRentBookingType(ShortTermRentBookingType.REQUEST);
      return this;
    }

    this.props.shortTermRent.setRentBookingType(ShortTermRentBookingType.INSTANT);
    return this;
  }

  public sendToApprove() {
    // TODO: add validation for check full filling all required props or return exception

    if (this.props.longTermRent) {
      this.props.longTermRent.sendToApprove();
    }

    if (this.props.shortTermRent) {
      this.props.shortTermRent.sendToApprove();
    }
  }

  public pause(periodType: ApartmentRentPeriodType) {
    const longTermRentPause = () => {
      if (!this.props.longTermRent) {
        throw new ApartmentAdPauseError('Apartment ad should have another rent period type');
      }

      this.props.longTermRent?.pause();
    };

    const shortTermRentPause = () => {
      if (!this.props.shortTermRent) {
        throw new ApartmentAdPauseError('Apartment ad should have another rent period type');
      }

      this.props.shortTermRent?.pause();
    };

    const pauseRentMap = {
      [ApartmentRentPeriodType.LONG_TERM]: longTermRentPause,
      [ApartmentRentPeriodType.SHORT_TERM]: shortTermRentPause,
    };

    pauseRentMap[periodType]();
  }

  publish(periodType: ApartmentRentPeriodType) {
    const longTermRentPause = () => {
      if (!this.props.longTermRent) {
        throw new ApartmentAdPublishError('Apartment ad should have another rent period type');
      }

      if (this.props.longTermRentAdIsRented) {
        throw new ApartmentAdPublishError(`Apartment type ${periodType} cannot be published it's ad already rented`);
      }

      this.props.longTermRent?.publish();
    };

    const shortTermRentPause = () => {
      if (!this.props.shortTermRent) {
        throw new ApartmentAdPublishError('Apartment ad should have another rent period type');
      }

      this.props.shortTermRent?.publish();
    };

    const publishRentMap = {
      [ApartmentRentPeriodType.LONG_TERM]: longTermRentPause,
      [ApartmentRentPeriodType.SHORT_TERM]: shortTermRentPause,
    };

    publishRentMap[periodType]();
  }

  isRentPublished(rentPeriodType: ApartmentRentPeriodType): boolean {
    const rentEntityMapper = {
      [ApartmentRentPeriodType.SHORT_TERM]: this.props.shortTermRent,
      [ApartmentRentPeriodType.LONG_TERM]: this.props.longTermRent,
    };

    return rentEntityMapper[rentPeriodType]?.status.isPublished ?? false;
  }

  get isPublishable() {
    const {
      landlordId,
      rentPeriodType,
      apartmentType,
      apartmentCategory,
      shortTermRent,
      longTermRent,
      details,
      address,
      media,
      description,
      rules,
    } = this.props;

    const fields = [
      landlordId,
      rentPeriodType,
      apartmentType,
      apartmentCategory,
      details,
      address,
      media,
      description,
      rules,
    ];

    const isNotFullFilled = fields.some((f) => f == null);

    if (isNotFullFilled) {
      return false;
    }

    if (shortTermRent && longTermRent) {
      return shortTermRent.isPublishable && longTermRent.isPublishable;
    }

    if (longTermRent) {
      return longTermRent.isPublishable;
    }

    if (shortTermRent) {
      return shortTermRent.isPublishable;
    }

    return false;
  }

  pausePublishingByAcceptContract(type: ApartmentRentPeriodType) {
    const rentMap = {
      [RentPeriodType.LONG_TERM]: this.rentLongTermAd.bind(this),
      [RentPeriodType.SHORT_TERM]: this.rentShortTermRentAd.bind(this),
    };

    rentMap[type]();

    return this;
  }

  get numberOfGuests() {
    return this.props.details?.numberOfGuests || 0;
  }

  isGuestsValid(guests: IGuests): boolean {
    const maxGuestsCount = this.props.details?.numberOfGuests;
    const guestsCount = guests.numberOfAdult + guests.numberOfChildren;

    if (!maxGuestsCount || maxGuestsCount < guestsCount) {
      return false;
    }

    const rules = this.props.rules?.unpack();

    if (
      (!rules?.allowedWithChildren && !!guests.numberOfChildren) ||
      (!rules?.allowedWithPets && !!guests.numberOfPets)
    ) {
      return false;
    }

    return true;
  }

  private rentLongTermAd() {
    if (this.props.longTermRent) {
      this.props.longTermRent.pause();
    }
  }

  private rentShortTermRentAd() {
    // do nothing
  }

  validate(): void {
    const { rentPeriodType, longTermRent, shortTermRent, paymentMethod } = this.props;

    if (!ApartmentAdGuard.isProperlyTermPeriod({ rentPeriodType, longTermRent, shortTermRent })) {
      throw new ApartmentAdTermPeriodError('Apartment ad must have correctly specified rental fields');
    }

    if (longTermRent && longTermRent.isApproved && !paymentMethod?.innopayCardId) {
      throw new IllegalOperationException('Approved apartment ad cannot be valid without payment method');
    }

    if (shortTermRent && shortTermRent.isApproved && !paymentMethod?.innopayCardId) {
      throw new IllegalOperationException('Approved apartment ad cannot be valid without payment method');
    }

    // @TODO: add invariant for validate sequence of completing
  }
}
