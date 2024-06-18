import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { ApartmentType } from '../types';
export interface ApartmentTypeProps {
    value: ApartmentType;
}
export declare class ApartmentTypeVO extends ValueObject<ApartmentTypeProps> {
    static create(type: ApartmentType): ApartmentTypeVO;
    get value(): ApartmentType;
    protected validate({ value }: ApartmentTypeProps): void;
}
