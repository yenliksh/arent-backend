import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { RentPeriodType } from '../types';
export interface RentPeriodTypeProps {
    value: RentPeriodType;
}
export declare class RentPeriodTypeVO extends ValueObject<RentPeriodTypeProps> {
    static create(type: RentPeriodType): RentPeriodTypeVO;
    get value(): RentPeriodType;
    protected validate({ value }: RentPeriodTypeProps): void;
}
