import { BaseContractModel } from '@domains/contract/models/contract.model';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import DataLoader from 'dataloader';
import { PaymentTransactionModel } from '../../models/payment-transaction.model';
export declare class PaymentTransactionResolver {
    contract(paymentTransaction: PaymentTransactionModel, apartmentAdOrmEntityLoader: DataLoader<string, ContractOrmEntity | undefined>): Promise<BaseContractModel>;
}
