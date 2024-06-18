import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
export interface ApartmentRulesProps {
    allowedWithPets: boolean | null;
    allowedWithChildren: boolean | null;
    allowedToSmoke: boolean | null;
    allowedToHangingOut: boolean | null;
}
export declare class ApartmentRulesVO extends ValueObject<ApartmentRulesProps> {
    private constructor();
    static create(props: ApartmentRulesProps): ApartmentRulesVO;
    protected validate(props: ApartmentRulesProps): void;
}
