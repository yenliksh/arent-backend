import { CurrencyType } from '@domains/apartment-ad/domain/types';
import { ObjectionEntityBase } from '@libs/ddd/infrastructure/database/objection.entity.base';
import { Model, RelationMappingsThunk } from 'objection';
import { ContractOrmEntity } from './contract.orm-entity';
export declare class TemporaryPaymentTransactionOrmEntity extends ObjectionEntityBase {
    static create(data: Omit<TemporaryPaymentTransactionOrmEntity, keyof Model>): TemporaryPaymentTransactionOrmEntity;
    static tableName: string;
    contractId: string;
    currency: CurrencyType;
    withdrawFundsDate: Date;
    totalAmountPayable: number;
    totalAmountToBeTransferred: number;
    totalRevenue: number;
    startDate: Date;
    endDate: Date;
    senderTaxRate: number;
    recipientTaxRate: number;
    rentDays: number;
    cost: number;
    taxAmount: number;
    isFirst: boolean;
    contract?: ContractOrmEntity;
    static relationMappings: RelationMappingsThunk;
}
