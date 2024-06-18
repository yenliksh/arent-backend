import { ContractEntity } from '@domains/contract/domain/entities/contract.entity';
import { ApartmentRentPeriodType, ShortTermRentCancellationPolicyType, ShortTermRentPaymentType } from '@infrastructure/enums';
export interface IContractCreateProps {
    arrivalDate: string;
    departureDate: string;
    cost: number;
    rentType: ApartmentRentPeriodType;
    shortTermRentPaymentTypeInput?: ShortTermRentPaymentType;
    shortTermRentCancelationPolicyType?: ShortTermRentCancellationPolicyType;
    withFine?: boolean;
}
export declare const contractRentalStrategyFactory: ({ arrivalDate, departureDate, cost, rentType, shortTermRentPaymentTypeInput, shortTermRentCancelationPolicyType, withFine, }: IContractCreateProps) => ContractEntity;
