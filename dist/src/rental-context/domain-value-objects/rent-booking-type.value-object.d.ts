import { ShortTermRentBookingType } from '@infrastructure/enums';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface ShortTermRentBookingTypeProps {
    value: ShortTermRentBookingType;
}
export declare class ShortTermRentBookingTypeVO extends ValueObject<ShortTermRentBookingTypeProps> {
    static create(type: ShortTermRentBookingType): ShortTermRentBookingTypeVO;
    get value(): ShortTermRentBookingType;
    protected validate({ value }: ShortTermRentBookingTypeProps): void;
}
