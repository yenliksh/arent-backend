import { CostAndCurrencyVO } from '@domain-value-objects/cost-and-currency.value-object';
import { Entity } from '@libs/ddd/domain/base-classes/entity.base';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
export interface CreateContractCancelationProps {
    contractId: UUID;
    triggerUserId: UUID;
    cancelationDate: DateTimeISOTZVO;
    checkOutDate: DateTimeISOTZVO;
    refundsAmountToSender: CostAndCurrencyVO;
    transferAmountToRecipient: CostAndCurrencyVO;
    transferAmountToPlatform: CostAndCurrencyVO;
    withdrawalAmountFromSender: CostAndCurrencyVO;
    withdrawalAmountFromRecipient: CostAndCurrencyVO;
    isFine: boolean;
}
export declare type ContractCancelationProps = Omit<CreateContractCancelationProps, 'triggerUserId'> & {
    triggerUserId?: UUID;
};
export declare class ContractCancelationEntity extends Entity<ContractCancelationProps> {
    protected readonly _id: UUID;
    static create({ cancelationDate, checkOutDate, contractId, refundsAmountToSender, transferAmountToPlatform, transferAmountToRecipient, withdrawalAmountFromSender, withdrawalAmountFromRecipient, isFine, triggerUserId, }: CreateContractCancelationProps): ContractCancelationEntity;
    validate(): void;
}
