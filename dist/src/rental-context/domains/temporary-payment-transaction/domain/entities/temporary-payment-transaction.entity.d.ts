import { PaymentTransactionBase } from '@domains/payment-transaction/domain/entities/types';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export interface CreateTemporaryPaymentTransactionProps extends PaymentTransactionBase {
    contractId: UUID;
    isFirst: boolean;
}
export declare type TemporaryPaymentTransactionProps = CreateTemporaryPaymentTransactionProps;
export declare class TemporaryPaymentTransactionEntity extends AggregateRoot<TemporaryPaymentTransactionProps> {
    protected readonly _id: UUID;
    static create({ contractId, isFirst, cost, endDate, recipientTaxRate, rentDays, senderTaxRate, startDate, taxAmount, totalAmountPayable, totalAmountToBeTransferred, totalRevenue, withdrawFundsDate, }: CreateTemporaryPaymentTransactionProps): TemporaryPaymentTransactionEntity;
    get isFirst(): boolean;
    get totalAmountPayable(): number;
    get withdrawFundsDate(): string;
    validate(): void;
}
