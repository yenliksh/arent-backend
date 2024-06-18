import { ApartmentAdCharacteristicsProps } from '@domain-value-objects/apartment-characteristics.value-object';
import { ApartmentRulesProps } from '@domain-value-objects/apartment-rules.value-object';
import { PaymentMethod } from '@infrastructure/enums';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import {
  ApartmentCategory,
  ApartmentType,
  LegalCapacityType,
  RentPeriodType,
} from 'src/rental-context/domains/apartment-ad/domain/types';
import { ApartmentAdDescriptionProps } from 'src/rental-context/domains/apartment-ad/domain/value-objects/apartment-ad-description.value-object';
import { MediaProps } from 'src/rental-context/domains/apartment-ad/domain/value-objects/media.value-object';

import { ApartmentAdComplaintOrmEntity } from './apartment-ad-complaint.orm-entity';
import { ContractRequestOrmEntity } from './contract-request.orm-entity';
import { ContractOrmEntity } from './contract.orm-entity';
import { InnopayCardOrmEntity } from './innopay-card.orm-entity';
import { LongTermRentOrmEntity } from './long-term-rent.orm-entity';
import { ShortTermRentOrmEntity } from './short-term-rent.orm-entity';
import { UserOrmEntity } from './user.orm-entity';

export class ApartmentAdOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<ApartmentAdOrmEntity, keyof Model>) {
    return ApartmentAdOrmEntity.fromJson(data);
  }

  static tableName = 'apartment_ads';

  landlordId: string;
  landlord?: UserOrmEntity | null;

  rentPeriodType: RentPeriodType;
  apartmentType: ApartmentType;
  apartmentCategory: ApartmentCategory;

  longTermRent?: LongTermRentOrmEntity | null;
  shortTermRent?: ShortTermRentOrmEntity | null;

  numberOfGuests?: number;
  numberOfRooms?: number;

  country?: string;
  city?: string;
  street?: string;
  region?: string;
  houseNumber?: string;
  lat?: number;
  lng?: number;
  timezone?: string;

  completeStep: number;

  media?: MediaProps;
  description?: ApartmentAdDescriptionProps;
  rules?: ApartmentRulesProps;

  characteristics?: ApartmentAdCharacteristicsProps;

  legalCapacityType: LegalCapacityType;
  legalCapacityTinBin?: string;
  legalCapacityCompanyName?: string;
  legalCapacityAddress?: string;

  defaultPaymentMethod?: PaymentMethod;
  innopayCardId?: string;
  innopayCard?: InnopayCardOrmEntity;
  contractRequests?: ContractRequestOrmEntity[];
  contracts?: ContractOrmEntity[];

  apartmentAdComplaints?: ApartmentAdComplaintOrmEntity[];

  static relationMappings: RelationMappingsThunk = () => {
    return {
      longTermRent: {
        relation: Model.HasOneRelation,
        modelClass: LongTermRentOrmEntity,
        join: {
          from: `${ApartmentAdOrmEntity.tableName}.id`,
          to: `${LongTermRentOrmEntity.tableName}.apartmentAdId`,
        },
      },
      shortTermRent: {
        relation: Model.HasOneRelation,
        modelClass: ShortTermRentOrmEntity,
        join: {
          from: `${ApartmentAdOrmEntity.tableName}.id`,
          to: `${ShortTermRentOrmEntity.tableName}.apartmentAdId`,
        },
      },
      landlord: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserOrmEntity,
        join: {
          from: `${ApartmentAdOrmEntity.tableName}.landlordId`,
          to: `${UserOrmEntity.tableName}.id`,
        },
      },
      innopayCard: {
        relation: Model.BelongsToOneRelation,
        modelClass: InnopayCardOrmEntity,
        join: {
          from: `${ApartmentAdOrmEntity.tableName}.innopayCardId`,
          to: `${InnopayCardOrmEntity.tableName}.id`,
        },
      },
      contractRequests: {
        relation: Model.HasManyRelation,
        modelClass: ContractRequestOrmEntity,
        join: {
          from: `${ApartmentAdOrmEntity.tableName}.id`,
          to: `${ContractRequestOrmEntity.tableName}.apartmentAdId`,
        },
      },
      contracts: {
        relation: Model.HasManyRelation,
        modelClass: ContractOrmEntity,
        join: {
          from: `${ApartmentAdOrmEntity.tableName}.id`,
          to: `${ContractOrmEntity.tableName}.apartmentAdId`,
        },
      },
      apartmentAdComplaints: {
        relation: Model.HasManyRelation,
        modelClass: ApartmentAdComplaintOrmEntity,
        join: {
          from: `${ApartmentAdOrmEntity.tableName}.id`,
          to: `${ApartmentAdComplaintOrmEntity.tableName}.apartmentAdId`,
        },
      },
    };
  };
}
