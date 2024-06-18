import { ApartmentRentPeriodType, LongTermRentCancellationPolicyType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface CancellationPolicyProps {
    shortTermCancellationPolicy?: ShortTermRentCancellationPolicyType;
    longTermCancellationPolicy?: LongTermRentCancellationPolicyType;
}
export declare type CancellationPolicyCreateProps = CancellationPolicyProps;
export declare class CancellationPolicyVO extends ValueObject<CancellationPolicyProps> {
    static create(apartmentRentPeriodType: ApartmentRentPeriodType, { shortTermCancellationPolicy, longTermCancellationPolicy }: CancellationPolicyCreateProps): CancellationPolicyVO;
    get shortTermCancellationPolicy(): ShortTermRentCancellationPolicyType | undefined;
    get longTermCancellationPolicy(): LongTermRentCancellationPolicyType | undefined;
    protected validate(props: CancellationPolicyProps): void;
}
