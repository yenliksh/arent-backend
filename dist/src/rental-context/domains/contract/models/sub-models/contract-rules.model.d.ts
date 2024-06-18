import { ApartmentRulesProps } from '@domain-value-objects/apartment-rules.value-object';
export declare class ContractRulesModel {
    allowedWithPets: boolean;
    allowedWithChildren: boolean;
    allowedToSmoke: boolean;
    allowedToHangingOut: boolean;
    static create(props: ApartmentRulesProps): ContractRulesModel;
}
