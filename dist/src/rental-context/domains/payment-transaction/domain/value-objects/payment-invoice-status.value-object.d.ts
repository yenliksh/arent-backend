import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { PaymentInvoiceStatus } from '../types';
export interface PaymentInvoiceStatusProps {
    value: PaymentInvoiceStatus;
}
export declare class PaymentInvoiceStatusVO extends ValueObject<PaymentInvoiceStatusProps> {
    static create(type: PaymentInvoiceStatus): PaymentInvoiceStatusVO;
    get value(): PaymentInvoiceStatus;
    protected validate({ value }: PaymentInvoiceStatusProps): void;
}
