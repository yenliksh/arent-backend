import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { LegalCapacityType } from '../types';
export interface LegalCapacityProps {
    type: LegalCapacityType;
    tinBin?: string;
    companyName?: string;
    address?: string;
}
export declare class LegalCapacityVO extends ValueObject<LegalCapacityProps> {
    private constructor();
    static create({ type, tinBin, companyName, address }: LegalCapacityProps): LegalCapacityVO;
    protected validate(props: LegalCapacityProps): void;
}
