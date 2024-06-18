import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { ApartmentCategory } from '../types';
export interface ApartmentCategoryProps {
    value: ApartmentCategory;
}
export declare class ApartmentCategoryVO extends ValueObject<ApartmentCategoryProps> {
    static create(type: ApartmentCategory): ApartmentCategoryVO;
    get value(): ApartmentCategory;
    protected validate({ value }: ApartmentCategoryProps): void;
}
