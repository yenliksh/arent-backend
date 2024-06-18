import { ISystemMessagePaymentTransactionMeta } from '@domains/message/domain/types';
import { PaymentTransactionStatus } from '@domains/payment-transaction/domain/types';
export declare class TransactionMetaModel {
    id: string;
    startDate: string;
    endDate: string;
    withdrawFundsDate: string;
    status: PaymentTransactionStatus;
    static create(props: ISystemMessagePaymentTransactionMeta): TransactionMetaModel;
}
