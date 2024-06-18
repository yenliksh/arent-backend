import { PaymentInvoiceOrmEntity } from '@infrastructure/database/entities/payment-invoice.orm-entity';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { PaymentInvoiceType } from '../domain/types';
import { PaymentTransactionModel } from './payment-transaction.model';
import { CardMetaModel } from './sub-models/card-meta.model';
export declare class PaymentInvoiceModel extends ModelBase {
    constructor(message: PaymentInvoiceOrmEntity);
    paymentTransactionId: string;
    invoiceDate: string;
    refersToUserId: string;
    type: PaymentInvoiceType;
    isSuccess: boolean;
    cardMeta?: CardMetaModel;
    paymentTransaction?: PaymentTransactionModel;
    static create(props: PaymentInvoiceOrmEntity): PaymentInvoiceModel;
}
