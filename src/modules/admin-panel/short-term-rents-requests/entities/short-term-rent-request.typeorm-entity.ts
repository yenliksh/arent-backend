import { ApartmentAdCharacteristicsProps } from '@domain-value-objects/apartment-characteristics.value-object';
import { ApartmentRulesProps } from '@domain-value-objects/apartment-rules.value-object';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ShortTermRentOrmEntity } from '@infrastructure/database/entities/short-term-rent.orm-entity';
import { PaymentMethod, ShortTermRentBookingType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ApartmentAdTypeormEntity } from '@modules/admin-panel/apartment-ads/entities/apartment-ad.typeorm-entity';
import { ShortTermRentTypeormEntity } from '@modules/admin-panel/short-term-rents/entities/short-term-rent.typeorm-entity';
import { UserTypeormEntity } from '@modules/admin-panel/users/entities/user.typeorm-entity';
import { Model } from 'objection';
import {
  ApartmentAdStatusType,
  ApartmentCategory,
  ApartmentType,
  CurrencyType,
  LegalCapacityType,
} from 'src/rental-context/domains/apartment-ad/domain/types';
import { ApartmentAdDescriptionProps } from 'src/rental-context/domains/apartment-ad/domain/value-objects/apartment-ad-description.value-object';
import { MediaProps } from 'src/rental-context/domains/apartment-ad/domain/value-objects/media.value-object';
import { IdentityStatusType } from 'src/rental-context/domains/user/domain/types';
import { ViewColumn, ViewEntity } from 'typeorm';

const tableName = 'short_term_rent_requests';

type IShortTermRentRequest = Omit<ShortTermRentOrmEntity, 'apartmentAdId' | keyof Model> &
  Omit<ApartmentAdOrmEntity, 'rentPeriodType' | 'completeStep' | keyof Model>;

@ViewEntity({
  name: tableName,
  expression: (connection) =>
    connection
      .createQueryBuilder()
      .select('apartment_ads.id', 'id')
      .addSelect('apartment_ads.apartmentType', 'apartmentType')
      .addSelect('apartment_ads.apartmentCategory', 'apartmentCategory')
      .addSelect('apartment_ads.numberOfGuests', 'numberOfGuests')
      .addSelect('apartment_ads.numberOfRooms', 'numberOfRooms')
      .addSelect('apartment_ads.country', 'country')
      .addSelect('apartment_ads.city', 'city')
      .addSelect('apartment_ads.street', 'street')
      .addSelect('apartment_ads.region', 'region')
      .addSelect('apartment_ads.houseNumber', 'houseNumber')
      .addSelect('apartment_ads.lat', 'lat')
      .addSelect('apartment_ads.lng', 'lng')
      .addSelect('apartment_ads.media', 'media')
      .addSelect('apartment_ads.description', 'description')
      .addSelect('apartment_ads.rules', 'rules')
      .addSelect('apartment_ads.characteristics', 'characteristics')
      .addSelect('apartment_ads.legalCapacityType', 'legalCapacityType')
      .addSelect('apartment_ads.legalCapacityTinBin', 'legalCapacityTinBin')
      .addSelect('apartment_ads.legalCapacityCompanyName', 'legalCapacityCompanyName')
      .addSelect('apartment_ads.legalCapacityAddress', 'legalCapacityAddress')
      .addSelect('apartment_ads.landlordId', 'landlordId')
      .addSelect('apartment_ads.innopayCardId', 'innopayCardId')
      .addSelect('apartment_ads.defaultPaymentMethod', 'defaultPaymentMethod')
      .addSelect('short_term_rents.cost', 'cost')
      .addSelect('short_term_rents.currency', 'currency')
      .addSelect('short_term_rents.status', 'status')
      .addSelect('short_term_rents.isApproved', 'isApproved')
      .addSelect('short_term_rents.declineReason', 'declineReason')
      .addSelect('short_term_rents.id', 'shortTermRentId')
      .addSelect('short_term_rents.rentBookingType', 'rentBookingType')
      .addSelect('short_term_rents.cancellationPolicy', 'cancellationPolicy')
      .addSelect('short_term_rents.arrivalTime', 'arrivalTime')
      .addSelect('short_term_rents.departureTime', 'departureTime')
      .addSelect('short_term_rents.bookingAccessInMonths', 'bookingAccessInMonths')
      .addSelect('apartment_ads.createdAt', 'createdAt')
      .addSelect('apartment_ads.updatedAt', 'updatedAt')
      .addSelect('apartment_ads.deletedAt', 'deletedAt')
      .from(ApartmentAdTypeormEntity.tableName, 'apartment_ads')
      .innerJoin(
        ShortTermRentTypeormEntity.tableName,
        'short_term_rents',
        'short_term_rents."apartmentAdId" = apartment_ads.id',
      )
      .innerJoin(UserTypeormEntity.tableName, 'landlords', 'landlords."id" = apartment_ads.landlordId')
      .where(`'${ApartmentAdStatusType.PROCESSING}' = ANY(${ShortTermRentTypeormEntity.tableName}.status)`)
      .andWhere(`"apartment_ads"."innopayCardId" IS NOT NULL`)
      .andWhere(`"landlords"."identityStatus" = '${IdentityStatusType.APPROVED}'`)
      .andWhere(`"landlords"."isPhoneApproved" = true`),
})
export class ShortTermRentRequestTypeormEntity implements IShortTermRentRequest {
  static tableName = tableName;

  @ViewColumn()
  id: string;

  @ViewColumn()
  landlordId: string;

  @ViewColumn()
  shortTermRentId: string;

  @ViewColumn()
  apartmentCategory: ApartmentCategory;

  @ViewColumn()
  apartmentType: ApartmentType;

  @ViewColumn()
  numberOfGuests?: number;

  @ViewColumn()
  numberOfRooms?: number;

  @ViewColumn()
  country?: string;

  @ViewColumn()
  city?: string;

  @ViewColumn()
  street?: string;

  @ViewColumn()
  region?: string;

  @ViewColumn()
  houseNumber?: string;

  @ViewColumn()
  lat?: number;

  @ViewColumn()
  lng?: number;

  @ViewColumn()
  media?: MediaProps;

  @ViewColumn()
  description?: ApartmentAdDescriptionProps;

  @ViewColumn()
  rules?: ApartmentRulesProps;

  @ViewColumn()
  characteristics?: ApartmentAdCharacteristicsProps;

  @ViewColumn()
  legalCapacityType: LegalCapacityType;

  @ViewColumn()
  legalCapacityTinBin?: string;

  @ViewColumn()
  legalCapacityCompanyName?: string;

  @ViewColumn()
  legalCapacityAddress?: string;

  @ViewColumn()
  cost: number;

  @ViewColumn()
  currency: CurrencyType;

  @ViewColumn()
  status: ApartmentAdStatusType[];

  @ViewColumn()
  isApproved: boolean;

  @ViewColumn()
  declineReason?: string;

  @ViewColumn()
  rentBookingType: ShortTermRentBookingType;

  @ViewColumn()
  cancellationPolicy?: ShortTermRentCancellationPolicyType;

  @ViewColumn()
  arrivalTime?: string;

  @ViewColumn()
  departureTime?: string;

  @ViewColumn()
  innopayCardId?: string;

  @ViewColumn()
  defaultPaymentMethod?: PaymentMethod;

  @ViewColumn()
  bookingAccessInMonths?: number;

  @ViewColumn()
  createdAt: Date;

  @ViewColumn()
  updatedAt: Date;

  @ViewColumn()
  deletedAt?: Date;
}
