import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { UserComplaintType } from '../types';
interface CauseOfComplaintProps {
    type: UserComplaintType[];
    reason?: string | null;
}
export declare class UserComplaintVO extends ValueObject<CauseOfComplaintProps> {
    static create(type: UserComplaintType[], reason?: string | null): UserComplaintVO;
    protected validate({ type, reason }: CauseOfComplaintProps): void;
}
export {};
