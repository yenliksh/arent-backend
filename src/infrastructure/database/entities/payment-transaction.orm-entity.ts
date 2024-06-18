import { CurrencyType } from '@domains/apartment-ad/domain/types';
import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { PaymentTransactionStatus } from '@domains/payment-transaction/domain/types';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';

import { ContractOrmEntity } from './contract.orm-entity';
import { PaymentInvoiceOrmEntity } from './payment-invoice.orm-entity';

export class PaymentTransactionOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<PaymentTransactionOrmEntity, keyof Model>) {
    return PaymentTransactionOrmEntity.fromJson(data);
  }

  static tableName = 'payment_transactions';

  contractId: string;

  currency: CurrencyType;
  withdrawFundsDate: Date;
  totalAmountPayable: number;
  totalAmountToBeTransferred: number;
  totalRevenue: number;

  startDate: Date;
  endDate: Date;
  senderTaxRate: number;
  recipientTaxRate: number;
  rentDays: number;
  cost: number;
  taxAmount: number;

  status: PaymentTransactionStatus;
  isLastPayment: boolean;
  isRecurring: boolean;
  isFailure: boolean;

  rentPeriodStrategyType: RentPeriodStrategyType;

  invoices?: PaymentInvoiceOrmEntity[];
  contract?: ContractOrmEntity;

  static relationMappings: RelationMappingsThunk = () => {
    return {
      invoices: {
        relation: Model.HasManyRelation,
        modelClass: PaymentInvoiceOrmEntity,
        join: {
          from: `${PaymentTransactionOrmEntity.tableName}.id`,
          to: `${PaymentInvoiceOrmEntity.tableName}.paymentTransactionId`,
        },
      },
      contract: {
        relation: Model.BelongsToOneRelation,
        modelClass: ContractOrmEntity,
        join: {
          from: `${PaymentTransactionOrmEntity.tableName}.contractId`,
          to: `${ContractOrmEntity.tableName}.id`,
        },
      },
    };
  };
}
