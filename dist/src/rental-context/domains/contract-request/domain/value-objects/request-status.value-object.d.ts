import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { ContractRequestStatus } from '../types';
export interface ContractRequestStatusProps {
    value: ContractRequestStatus;
}
export declare class ContractRequestStatusVO extends ValueObject<ContractRequestStatusProps> {
    static create(type: ContractRequestStatus): ContractRequestStatusVO;
    get value(): ContractRequestStatus;
    protected validate({ value }: ContractRequestStatusProps): void;
}
