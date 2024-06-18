import { ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface ShortTermRentCancellationPolicyProps {
    value: ShortTermRentCancellationPolicyType;
}
export declare class ShortTermRentCancellationPolicyVO extends ValueObject<ShortTermRentCancellationPolicyProps> {
    static create(type: ShortTermRentCancellationPolicyType): ShortTermRentCancellationPolicyVO;
    get value(): ShortTermRentCancellationPolicyType;
    protected validate(props: ShortTermRentCancellationPolicyProps): void;
}
