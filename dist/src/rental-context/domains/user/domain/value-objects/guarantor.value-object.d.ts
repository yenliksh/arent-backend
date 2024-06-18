import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface GuarantorProps {
    phone: string;
    firstName: string;
    lastName: string;
}
export declare class GuarantorVO extends ValueObject<GuarantorProps> {
    constructor({ phone, firstName, lastName }: GuarantorProps);
    protected validate(props: GuarantorProps): void;
}
