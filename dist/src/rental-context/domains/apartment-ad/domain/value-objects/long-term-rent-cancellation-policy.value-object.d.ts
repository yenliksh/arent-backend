import { LongTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface LongTermRentCancellationPolicyProps {
    value: LongTermRentCancellationPolicyType;
}
export declare class LongTermRentCancellationPolicyVO extends ValueObject<LongTermRentCancellationPolicyProps> {
    static create(type: LongTermRentCancellationPolicyType): LongTermRentCancellationPolicyVO;
    get value(): LongTermRentCancellationPolicyType;
    protected validate(props: LongTermRentCancellationPolicyProps): void;
}
