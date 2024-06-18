import { GuarantorProps } from '../../domain/value-objects/guarantor.value-object';
export declare class GuarantorModel {
    phone: string;
    firstName: string;
    lastName: string;
    static create(guarantor: GuarantorProps): GuarantorModel;
}
