import { ApartmentAdModel } from '@domains/apartment-ad/models/apartment-ad.model';
import { ContractLandlordModel } from '@domains/contract/models/contract.model';
import { NextPaymentInfoModel } from '@domains/contract/models/sub-models/next-payment-info.model';
import { UserMeModel, UserModel } from '@domains/user/models/user.model';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import DataLoader from 'dataloader';
export declare class ContractLandlordResolver {
    apartmentAd(contract: ContractLandlordModel, apartmentAdOrmEntityLoader: DataLoader<string, ApartmentAdOrmEntity>): Promise<ApartmentAdModel | null>;
    landlord(contract: ContractLandlordModel, userOrmEntityLoader: DataLoader<string, UserOrmEntity>): Promise<UserMeModel | null>;
    tenant(contract: ContractLandlordModel, userOrmEntityLoader: DataLoader<string, UserOrmEntity>): Promise<UserModel | null>;
    nextPayment(contract: ContractLandlordModel, paymentTransactionOrmEntityLoader: DataLoader<string, PaymentTransactionOrmEntity>): Promise<NextPaymentInfoModel | null>;
}
