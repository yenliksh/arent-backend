import { CardMeta, PaymentInvoiceStatus, PaymentInvoiceType } from '@domains/payment-transaction/domain/types';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';

import { PaymentTransactionOrmEntity } from './payment-transaction.orm-entity';

export class PaymentInvoiceOrmEntity extends ObjectionEntityBase {
  static create(data: Omit<PaymentInvoiceOrmEntity, keyof Model>) {
    return PaymentInvoiceOrmEntity.fromJson(data);
  }

  static tableName = 'payment_invoices';

  paymentTransactionId: string;
  date: string;
  status: PaymentInvoiceStatus;
  type: PaymentInvoiceType;
  refersToUserId: string;
  error?: string;
  cardMeta: CardMeta;
  customerReference: string;
  //TODO: remove temp column
  livinCustomerReference: string | null;

  transaction?: PaymentTransactionOrmEntity;

  static relationMappings: RelationMappingsThunk = () => {
    return {
      transaction: {
        relation: Model.BelongsToOneRelation,
        modelClass: PaymentTransactionOrmEntity,
        join: {
          from: `${PaymentInvoiceOrmEntity.tableName}.paymentTransactionId`,
          to: `${PaymentTransactionOrmEntity.tableName}.id`,
        },
      },
    };
  };
}
