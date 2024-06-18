import { CustomerReferenceVO } from '@domains/payment-transaction/domain/value-objects/customer-reference.value-object';
import { Entity } from '@libs/ddd/domain/base-classes/entity.base';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { CardMeta, PaymentInvoiceStatus, PaymentInvoiceType } from '../types';
import { PaymentInvoiceStatusVO } from '../value-objects/payment-invoice-status.value-object';
export interface CreatePaymentInvoiceProps {
    paymentTransactionId: UUID;
    date: DateTimeISOTZVO;
    status: PaymentInvoiceStatusVO;
    refersToUserId: UUID;
    type: PaymentInvoiceType;
    error?: string;
    cardMeta: CardMeta;
    customerReference: CustomerReferenceVO;
}
export declare type PaymentInvoiceProps = CreatePaymentInvoiceProps;
export declare class PaymentInvoiceEntity extends Entity<PaymentInvoiceProps> {
    protected readonly _id: UUID;
    static create({ paymentTransactionId, date, status, refersToUserId, type, error, cardMeta, customerReference, }: CreatePaymentInvoiceProps): PaymentInvoiceEntity;
    get id(): UUID;
    get status(): PaymentInvoiceStatus;
    validate(): void;
}
