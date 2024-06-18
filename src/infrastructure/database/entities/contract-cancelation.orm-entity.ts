import { CurrencyType } from '@domains/apartment-ad/domain/types';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';

import { ContractOrmEntity } from './contract.orm-entity';

export class ContractCancelationOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<ContractCancelationOrmEntity, keyof Model>) {
    return ContractCancelationOrmEntity.fromJson(data);
  }

  static tableName = 'contract_cancelations';

  contractId: string;
  triggerUserId?: string;

  cancelationDate: string;
  checkOutDate: string;

  refundsAmountToSenderCost: number;
  refundsAmountToSenderCurrency: CurrencyType;

  transferAmountToRecipientCost: number;
  transferAmountToRecipientCurrency: CurrencyType;

  transferAmountToPlatformCost: number;
  transferAmountToPlatformCurrency: CurrencyType;

  withdrawalAmountFromSenderCost: number;
  withdrawalAmountFromSenderCurrency: CurrencyType;

  withdrawalAmountFromRecipientCost: number;
  withdrawalAmountFromRecipientCurrency: CurrencyType;

  isFine: boolean;

  contract?: ContractOrmEntity;

  static relationMappings: RelationMappingsThunk = () => {
    return {
      contract: {
        relation: Model.BelongsToOneRelation,
        modelClass: ContractOrmEntity,
        join: {
          from: `${ContractCancelationOrmEntity.tableName}.contractId`,
          to: `${ContractOrmEntity.tableName}.id`,
        },
      },
    };
  };
}
