import { PaymentMethod } from '@infrastructure/enums';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface PaymentMethodProps {
    defaultType: PaymentMethod;
    innopayCardId: string;
}
export declare class PaymentMethodVO extends ValueObject<PaymentMethodProps> {
    constructor(props: PaymentMethodProps);
    get defaultType(): PaymentMethod;
    get innopayCardId(): string;
    protected validate({ defaultType, innopayCardId }: PaymentMethodProps): void;
}
