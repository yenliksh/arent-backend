import { AddressVO } from '@domain-value-objects/address.value-object';
import { ApartmentAdCharacteristicsVO } from '@domain-value-objects/apartment-characteristics.value-object';
import { ApartmentRulesProps, ApartmentRulesVO } from '@domain-value-objects/apartment-rules.value-object';
import { PaymentMethodVO } from '@domain-value-objects/payment-method.value-object';
import { ShortTermRentBookingType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

import { RentPeriodType } from '../types';
import { ApartmentAdDescriptionVO } from '../value-objects/apartment-ad-description.value-object';
import { ApartmentAdDetailsVO } from '../value-objects/apartment-ad-details.value-object';
import { ApartmentCategoryVO } from '../value-objects/apartment-category.value-objects';
import { ApartmentTypeVO } from '../value-objects/apartment-type.value-object';
import { LegalCapacityVO } from '../value-objects/legal-capacity.value-object';
import { MediaVO } from '../value-objects/media.value-object';
import { RentPeriodTypeVO } from '../value-objects/rent-period-type.value-object';
import { LongTermRentEntity } from './long-term-rent.entity';
import { ShortTermRentEntity } from './short-term-rent.entity';

export interface ApartmentAdBaseProps {
  rentPeriodType: RentPeriodType;
  shortTermRentCost?: number | null;
  longTermRentCost?: number | null;
  slug?: string;
}

export interface ApartmentAdCreateProps extends ApartmentAdBaseProps {
  landlordId: UUID;
  slug?: string;
}

export type ApartmentAdEditProps = ApartmentAdBaseProps;

export type ApartmentAdProps = {
  landlordId: UUID;
  rentPeriodType: RentPeriodTypeVO;
  apartmentCategory: ApartmentCategoryVO;
  apartmentType: ApartmentTypeVO;
  shortTermRent?: ShortTermRentEntity | null;
  longTermRent?: LongTermRentEntity | null;
  details?: ApartmentAdDetailsVO;
  address?: AddressVO;
  media?: MediaVO;
  description?: ApartmentAdDescriptionVO;
  rules?: ApartmentRulesVO;
  characteristics?: ApartmentAdCharacteristicsVO;
  legalCapacity: LegalCapacityVO;
  paymentMethod?: PaymentMethodVO;
  slug?: string;
  completeStep: number;
  longTermRentAdIsRented: boolean;
  isUserIdentityApproved: boolean;
};

export type ImportantInfoSetProps = ApartmentRulesProps & {
  shortTermRentArrivalTime?: string;
  shortTermRentDepartureTime?: string;
  shortTermRentBookingType?: ShortTermRentBookingType;
  shortTermRentCancellationPolicyType?: ShortTermRentCancellationPolicyType;
};

export class ILockedDate {
  startDate: string;
  endDate: string;
}

export interface AvailabilitySettingsEditProps {
  lockedDates: ILockedDate[];
  bookingAccessInMonths: number;
}

export interface ApartmentAdIdentificatorProps {
  adSearchId?: number;
  apartmentId: UUID;
  slug?: string;
  titleSeo?: string;
  descriptionSeo?: string;
  keywordsSeo?: string;
}
