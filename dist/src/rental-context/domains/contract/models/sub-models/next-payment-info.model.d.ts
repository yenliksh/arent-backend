import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
export declare class NextPaymentInfoModel extends ModelBase {
    constructor(message: PaymentTransactionOrmEntity);
    contractId: string;
    withdrawFundsDate: string;
    static create(props: PaymentTransactionOrmEntity): NextPaymentInfoModel;
}
