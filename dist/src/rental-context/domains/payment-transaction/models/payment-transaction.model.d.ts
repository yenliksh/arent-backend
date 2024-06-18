import { CurrencyType } from '@domains/apartment-ad/domain/types';
import { BaseContractModel } from '@domains/contract/models/contract.model';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
import { PaymentTransactionStatus } from '../domain/types';
export declare class PaymentTransactionModel extends ModelBase {
    constructor(message: PaymentTransactionOrmEntity);
    contractId: string;
    currency: CurrencyType;
    withdrawFundsDate: string;
    totalAmountPayable: string;
    totalAmountToBeTransferred: string;
    startDate: string;
    endDate: string;
    senderTaxRate: number;
    recipientTaxRate: number;
    rentDays: number;
    cost: string;
    taxAmount: string;
    status: PaymentTransactionStatus;
    isReadyToPay: boolean;
    contract?: BaseContractModel;
    static create(props: PaymentTransactionOrmEntity): PaymentTransactionModel;
}
