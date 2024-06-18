import { ApartmentAdCharacteristicsProps } from '@domain-value-objects/apartment-characteristics.value-object';
import { ApartmentRulesProps } from '@domain-value-objects/apartment-rules.value-object';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { LongTermRentOrmEntity } from '@infrastructure/database/entities/long-term-rent.orm-entity';
import { LongTermRentCancellationPolicyType, PaymentMethod } from '@infrastructure/enums';
import { ApartmentAdTypeormEntity } from '@modules/admin-panel/apartment-ads/entities/apartment-ad.typeorm-entity';
import { LongTermRentTypeormEntity } from '@modules/admin-panel/long-term-rents/entities/long-term-rent.typeorm-entity';
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

const tableName = 'long_term_rent_requests';

type LongTermRentRequest = Omit<LongTermRentOrmEntity, 'apartmentAdId' | keyof Model> &
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
      .addSelect('long_term_rents.cost', 'cost')
      .addSelect('long_term_rents.currency', 'currency')
      .addSelect('long_term_rents.status', 'status')
      .addSelect('long_term_rents.cancellationPolicy', 'cancellationPolicy')
      .addSelect('long_term_rents.isApproved', 'isApproved')
      .addSelect('long_term_rents.declineReason', 'declineReason')
      .addSelect('long_term_rents.ownershipDocuments', 'ownershipDocuments')
      .addSelect('long_term_rents.id', 'longTermRentId')
      .addSelect('apartment_ads.createdAt', 'createdAt')
      .addSelect('apartment_ads.updatedAt', 'updatedAt')
      .addSelect('apartment_ads.deletedAt', 'deletedAt')
      .from(ApartmentAdTypeormEntity.tableName, 'apartment_ads')
      .innerJoin(
        LongTermRentTypeormEntity.tableName,
        'long_term_rents',
        'long_term_rents."apartmentAdId" = apartment_ads.id',
      )
      .innerJoin(UserTypeormEntity.tableName, 'landlords', 'landlords."id" = apartment_ads.landlordId')
      .where(`'${ApartmentAdStatusType.PROCESSING}' = ANY(${LongTermRentTypeormEntity.tableName}.status)`)
      .andWhere(`"apartment_ads"."innopayCardId" IS NOT NULL`)
      .andWhere(`"long_term_rents"."ownershipDocuments" IS NOT NULL`)
      .andWhere(`"landlords"."identityStatus" = '${IdentityStatusType.APPROVED}'`)
      .andWhere(`"landlords"."isPhoneApproved" = true`),
})
export class LongTermRentRequestTypeormEntity implements LongTermRentRequest {
  static tableName = tableName;

  @ViewColumn()
  id: string;

  @ViewColumn()
  landlordId: string;

  @ViewColumn()
  longTermRentId: string;

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
  cancellationPolicy?: LongTermRentCancellationPolicyType;

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
  ownershipDocuments?: string[];

  @ViewColumn()
  innopayCardId?: string;

  @ViewColumn()
  defaultPaymentMethod?: PaymentMethod;

  @ViewColumn()
  createdAt: Date;

  @ViewColumn()
  updatedAt: Date;

  @ViewColumn()
  deletedAt?: Date;
}
