import { ApartmentRulesProps } from '@domain-value-objects/apartment-rules.value-object';
declare type ApartmentAdRulesModelCreateProps = Required<ApartmentRulesProps>;
export declare class ApartmentAdRulesModel {
    allowedWithPets: boolean | null;
    allowedWithChildren: boolean | null;
    allowedToSmoke: boolean | null;
    allowedToHangingOut: boolean | null;
    constructor(model: ApartmentAdRulesModel);
    static create(props: ApartmentAdRulesModelCreateProps): ApartmentAdRulesModel;
}
export {};
