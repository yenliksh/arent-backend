import { CostAndCurrencyVO } from '@domain-value-objects/cost-and-currency.value-object';
import { RentPeriodStrategyType } from '@domains/contract/base-classes/rental-manager/types';
import { InnopayCardEntity } from '@domains/innopay-card/domain/entities/innopay-card.entity';
import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { CardMeta, PaymentInvoiceType, PaymentTransactionStatus } from '../types';
import { PaymentInvoiceEntity } from './payment-invoice.entity';
import { PaymentTransactionBase } from './types';
export interface CreatePaymentTransactionProps extends PaymentTransactionBase {
    contractId: UUID;
    recipientId: UUID;
    senderId: UUID;
    isLastPayment: boolean;
    isRecurring: boolean;
    rentPeriodStrategyType: RentPeriodStrategyType;
}
export declare type PaymentTransactionProps = CreatePaymentTransactionProps & {
    status: PaymentTransactionStatus;
    isFailure: boolean;
    senderCard?: InnopayCardEntity;
    recipientCard?: InnopayCardEntity;
    invoices: PaymentInvoiceEntity[];
};
export declare type PaymentTransactionMeta = {
    id: string;
    status: PaymentTransactionStatus;
    startDate: Date;
    endDate: Date;
    withdrawFundsDate: Date;
};
export declare class PaymentTransactionEntity extends AggregateRoot<PaymentTransactionProps> {
    protected readonly _id: UUID;
    static readonly EARLY_PAY_DAYS = 7;
    static readonly CASH_OUT_AFTER_ARRIVAL_DAYS = 1;
    get recipientId(): UUID;
    get senderId(): UUID;
    static create({ contractId, totalAmountPayable, totalAmountToBeTransferred, totalRevenue, withdrawFundsDate, startDate, endDate, senderTaxRate, recipientTaxRate, rentDays, cost, taxAmount, isLastPayment, isRecurring, recipientId, senderId, rentPeriodStrategyType, }: CreatePaymentTransactionProps): PaymentTransactionEntity;
    get isLastPayment(): boolean;
    isCashInActive(): boolean;
    isCashOutActive(): boolean;
    isReadyToSelfPayNow(tenantId: UUID): boolean;
    isReadyToFirstContractPay(): boolean;
    cashInSuccess(cardMeta: CardMeta, customerReference: {
        customerReference: string;
    }): void;
    cashOutSuccess(cardMeta: CardMeta, customerReference: {
        customerReference: string;
        livinCustomerReference?: string;
    }): void;
    failure(action: PaymentInvoiceType, cardMeta: CardMeta, customerReference: {
        customerReference: string;
        livinCustomerReference?: string;
    }, error?: string): void;
    cancel(): void;
    private addSuccessInvoice;
    private addFailureInvoice;
    get id(): UUID;
    get totalAmountPayable(): number;
    get totalAmountPayableCurrency(): import("../../../apartment-ad/domain/types").CurrencyType;
    get costPayable(): number;
    get costPayableCurrency(): import("../../../apartment-ad/domain/types").CurrencyType;
    get rentDays(): number;
    get cost(): CostAndCurrencyVO;
    get status(): PaymentTransactionStatus;
    get startDate(): DateTimeISOTZVO;
    get endDate(): DateTimeISOTZVO;
    get withdrawFundsDate(): string;
    get taxAmount(): number;
    get totalRevenue(): number;
    get totalAmountToBeTransferred(): number;
    get contractId(): UUID;
    get senderCardOrFail(): InnopayCardEntity;
    get recipientCardOrFail(): InnopayCardEntity;
    get isRecurring(): boolean;
    get metaInfo(): PaymentTransactionMeta;
    setCheckOutDate(newCheckOutDate: string): this;
    validate(): void;
}
