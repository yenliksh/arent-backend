import { ApartmentAdViewModel } from '@domains/apartment-ad/models/apartment-ad.model';
import { ContractTenantModel } from '@domains/contract/models/contract.model';
import { ContractCancelationModel } from '@domains/contract/models/sub-models/contract-cancelation.model';
import { NextPaymentInfoModel } from '@domains/contract/models/sub-models/next-payment-info.model';
import { InnopayCardModel } from '@domains/innopay-card/models/innopay-card.model';
import { UserMeModel, UserModel } from '@domains/user/models/user.model';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ContractCancelationOrmEntity } from '@infrastructure/database/entities/contract-cancelation.orm-entity';
import { InnopayCardOrmEntity } from '@infrastructure/database/entities/innopay-card.orm-entity';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import DataLoader from 'dataloader';
export declare class ContractTenantResolver {
    apartmentAd(contract: ContractTenantModel, apartmentAdOrmEntityLoader: DataLoader<string, ApartmentAdOrmEntity>): Promise<ApartmentAdViewModel | null>;
    landlord(contract: ContractTenantModel, userOrmEntityLoader: DataLoader<string, UserOrmEntity>): Promise<UserModel | null>;
    tenant(contract: ContractTenantModel, userOrmEntityLoader: DataLoader<string, UserOrmEntity>): Promise<UserMeModel | null>;
    innopayCard(contract: ContractTenantModel, innopayCardOrmEntityLoader: DataLoader<string, InnopayCardOrmEntity>): Promise<InnopayCardModel | null>;
    nextPayment(contract: ContractTenantModel, paymentTransactionOrmEntityLoader: DataLoader<string, PaymentTransactionOrmEntity>): Promise<NextPaymentInfoModel | null>;
    contractCancelation(contract: ContractTenantModel, contractCancelationOrmEntityLoader: DataLoader<string, ContractCancelationOrmEntity | undefined>): Promise<ContractCancelationModel | null>;
}
