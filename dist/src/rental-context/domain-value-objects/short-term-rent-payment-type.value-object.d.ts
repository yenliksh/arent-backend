import { ShortTermRentPaymentType } from '@infrastructure/enums';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface ShortTermRentPaymentTypeProps {
    value: ShortTermRentPaymentType;
}
export declare class ShortTermRentPaymentTypeVO extends ValueObject<ShortTermRentPaymentTypeProps> {
    static create(type: ShortTermRentPaymentType): ShortTermRentPaymentTypeVO;
    get value(): ShortTermRentPaymentType;
    protected validate({ value }: ShortTermRentPaymentTypeProps): void;
}
