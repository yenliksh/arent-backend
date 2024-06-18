import { ContractStatus } from '@infrastructure/enums';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface ContractStatusProps {
    value: ContractStatus;
}
export declare class ContractStatusVO extends ValueObject<ContractStatusProps> {
    static create(type: ContractStatus): ContractStatusVO;
    get value(): ContractStatus;
    protected validate({ value }: ContractStatusProps): void;
}
