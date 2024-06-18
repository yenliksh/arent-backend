import { IGuests } from '@domain-value-objects/apartment-guests.value-object';
import { ApartmentRulesProps } from '@domain-value-objects/apartment-rules.value-object';
import { IBaseApartmentAdData } from '@domains/contract/domain/value-objects/base-contract-apartment-ad-data.value-object';
import {
  ApartmentRentPeriodType,
  ContractStatus,
  LongTermRentCancellationPolicyType,
  PaymentMethod,
  ShortTermRentBookingType,
  ShortTermRentCancellationPolicyType,
  ShortTermRentPaymentType,
} from '@infrastructure/enums';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { CurrencyType } from 'src/rental-context/domains/apartment-ad/domain/types';

import { ApartmentAdOrmEntity } from './apartment-ad.orm-entity';
import { ContractCancelationOrmEntity } from './contract-cancelation.orm-entity';
import { ContractRequestOrmEntity } from './contract-request.orm-entity';
import { InnopayCardOrmEntity } from './innopay-card.orm-entity';
import { PaymentTransactionOrmEntity } from './payment-transaction.orm-entity';
import { RentPeriodVersionOrmEntity } from './rent-period-version.orm-entity';
import { UserOrmEntity } from './user.orm-entity';

export class ContractOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<ContractOrmEntity, keyof Model>) {
    return ContractOrmEntity.fromJson(data);
  }

  static tableName = 'contracts';

  contractRequestId?: string;
  rentPeriodVersionId: string;
  tenantId?: string;
  landlordId?: string;
  apartmentAdId?: string;
  apartmentRentPeriodType: ApartmentRentPeriodType;
  cost: number;
  currency: CurrencyType;
  status: ContractStatus;
  arrivalDate?: Date;
  departureDate?: Date;
  rules?: ApartmentRulesProps;

  rentBookingType?: ShortTermRentBookingType;
  rentPaymentType?: ShortTermRentPaymentType;

  baseApartmentAdData: IBaseApartmentAdData;
  guests: IGuests;

  isPending: boolean;
  isFined: boolean;
  isTemporary: boolean;

  shortTermCancellationPolicy?: ShortTermRentCancellationPolicyType;
  longTermCancellationPolicy?: LongTermRentCancellationPolicyType;

  defaultPaymentMethod?: PaymentMethod | null;
  tenantInnopayCardId?: string | null;
  nextPaymentTransactionId?: string;

  customerReference?: string | null;
  paymentUrl?: string | null;
  paymentUrlStartAt?: Date | null;

  tenantInnopayCard?: InnopayCardOrmEntity;
  transactions?: PaymentTransactionOrmEntity[];
  rentPeriodVersion?: RentPeriodVersionOrmEntity;
  contractRequest?: ContractRequestOrmEntity;
  apartmentAd?: ApartmentAdOrmEntity;
  tenant?: UserOrmEntity;
  contractCancelation?: ContractCancelationOrmEntity;

  static relationMappings: RelationMappingsThunk = () => {
    return {
      transactions: {
        relation: Model.HasManyRelation,
        modelClass: PaymentTransactionOrmEntity,
        join: {
          from: `${ContractOrmEntity.tableName}.id`,
          to: `${PaymentTransactionOrmEntity.tableName}.contractId`,
        },
      },
      contractRequest: {
        relation: Model.BelongsToOneRelation,
        modelClass: ContractRequestOrmEntity,
        join: {
          from: `${ContractOrmEntity.tableName}.contractRequestId`,
          to: `${ContractRequestOrmEntity.tableName}.id`,
        },
      },
      apartmentAd: {
        relation: Model.BelongsToOneRelation,
        modelClass: ApartmentAdOrmEntity,
        join: {
          from: `${ContractOrmEntity.tableName}.apartmentAdId`,
          to: `${ApartmentAdOrmEntity.tableName}.id`,
        },
      },
      rentPeriodVersion: {
        relation: Model.BelongsToOneRelation,
        modelClass: RentPeriodVersionOrmEntity,
        join: {
          from: `${ContractOrmEntity.tableName}.rentPeriodVersionId`,
          to: `${RentPeriodVersionOrmEntity.tableName}.id`,
        },
      },
      tenantInnopayCard: {
        relation: Model.BelongsToOneRelation,
        modelClass: InnopayCardOrmEntity,
        join: {
          from: `${ContractOrmEntity.tableName}.tenantInnopayCardId`,
          to: `${InnopayCardOrmEntity.tableName}.id`,
        },
      },
      tenant: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserOrmEntity,
        join: {
          from: `${ContractOrmEntity.tableName}.tenantId`,
          to: `${UserOrmEntity.tableName}.id`,
        },
      },
      contractCancelation: {
        relation: Model.HasOneRelation,
        modelClass: ContractCancelationOrmEntity,
        join: {
          from: `${ContractOrmEntity.tableName}.id`,
          to: `${ContractCancelationOrmEntity.tableName}.contractId`,
        },
      },
    };
  };
}
