import { ContractCancelationOrmEntity } from '@infrastructure/database/entities/contract-cancelation.orm-entity';
import { ModelBase } from '@libs/ddd/interface-adapters/base-classes/model.base';
export declare class ContractCancelationModel extends ModelBase {
    contractId: string;
    cancelationDate: string;
    checkOutDate: string;
    refundsAmountToSenderCost: string;
    refundsAmountToSenderCurrency: string;
    static create(props: ContractCancelationOrmEntity): ContractCancelationModel;
}
