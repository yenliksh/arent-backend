import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { AdComplaintType } from '../types';
interface CauseOfComplaintProps {
    type: AdComplaintType[];
    reason?: string | null;
}
export declare class AdComplaintVO extends ValueObject<CauseOfComplaintProps> {
    static create(type: AdComplaintType[], reason?: string | null): AdComplaintVO;
    protected validate({ type, reason }: CauseOfComplaintProps): void;
}
export {};
