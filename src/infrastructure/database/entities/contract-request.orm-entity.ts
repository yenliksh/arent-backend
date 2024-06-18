import { IGuests } from '@domain-value-objects/apartment-guests.value-object';
import { ApartmentRentPeriodType, ShortTermRentBookingType, ShortTermRentPaymentType } from '@infrastructure/enums';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { ContractRequestStatus } from 'src/rental-context/domains/contract-request/domain/types';

import { ApartmentAdOrmEntity } from './apartment-ad.orm-entity';
import { ContractOrmEntity } from './contract.orm-entity';
import { InnopayCardOrmEntity } from './innopay-card.orm-entity';

export class ContractRequestOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<ContractRequestOrmEntity, keyof Model>) {
    return ContractRequestOrmEntity.fromJson(data);
  }

  static tableName = 'contract_requests';

  tenantId?: string;
  apartmentAdId?: string;
  apartmentRentPeriodType: ApartmentRentPeriodType;
  status: ContractRequestStatus;
  rentPeriodVersionId: string;
  arrivalDate?: Date;
  departureDate?: Date;
  comment?: string;
  guests: IGuests;

  rentBookingType?: ShortTermRentBookingType;
  rentPaymentType?: ShortTermRentPaymentType;

  rejectReason?: string;

  tenantInnopayCard?: InnopayCardOrmEntity;
  apartmentAd?: ApartmentAdOrmEntity;
  contract?: ContractOrmEntity;

  static relationMappings: RelationMappingsThunk = () => {
    return {
      apartmentAd: {
        relation: Model.BelongsToOneRelation,
        modelClass: ApartmentAdOrmEntity,
        join: {
          from: `${ContractRequestOrmEntity.tableName}.apartmentAdId`,
          to: `${ApartmentAdOrmEntity.tableName}.id`,
        },
      },
      contract: {
        relation: Model.BelongsToOneRelation,
        modelClass: ContractOrmEntity,
        join: {
          from: `${ContractRequestOrmEntity.tableName}.id`,
          to: `${ContractOrmEntity.tableName}.contractRequestId`,
        },
      },
    };
  };
}
