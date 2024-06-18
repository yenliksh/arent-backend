import { CardMeta, PaymentInvoiceStatus, PaymentInvoiceType } from '@domains/payment-transaction/domain/types';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { PaymentTransactionOrmEntity } from './payment-transaction.orm-entity';
export declare class PaymentInvoiceOrmEntity extends ObjectionEntityBase {
    static create(data: Omit<PaymentInvoiceOrmEntity, keyof Model>): PaymentInvoiceOrmEntity;
    static tableName: string;
    paymentTransactionId: string;
    date: string;
    status: PaymentInvoiceStatus;
    type: PaymentInvoiceType;
    refersToUserId: string;
    error?: string;
    cardMeta: CardMeta;
    customerReference: string;
    livinCustomerReference: string | null;
    transaction?: PaymentTransactionOrmEntity;
    static relationMappings: RelationMappingsThunk;
}
