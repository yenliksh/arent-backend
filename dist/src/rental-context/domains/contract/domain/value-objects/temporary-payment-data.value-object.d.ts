import { UrlVO } from '@domains/user/domain/value-objects';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface TemporaryPaymentUrlProps {
    customerReference: string;
    paymentUrl: UrlVO;
    paymentUrlStartAt: Date;
}
export declare class TemporaryPaymentDataVO extends ValueObject<TemporaryPaymentUrlProps> {
    constructor(props: TemporaryPaymentUrlProps);
    get customerReference(): string;
    get paymentUrl(): string;
    get paymentUrlStartAt(): string;
    protected validate(props: TemporaryPaymentUrlProps): void;
}
