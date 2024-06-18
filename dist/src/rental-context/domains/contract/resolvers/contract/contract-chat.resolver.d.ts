import { ApartmentAdViewModel } from '@domains/apartment-ad/models/apartment-ad.model';
import { InnopayPaymentPageData } from '@domains/contract/domain/types';
import { ContractChatModel } from '@domains/contract/models/contract.model';
import { InnopayPaymentPageModel } from '@domains/contract/models/sub-models/innopay-payment-page.model';
import { UserModel } from '@domains/user/models/user.model';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import DataLoader from 'dataloader';
export declare class ContractChatResolver {
    apartmentAd(contract: ContractChatModel, apartmentAdOrmEntityLoader: DataLoader<string, ApartmentAdOrmEntity>): Promise<ApartmentAdViewModel | null>;
    landlord(contract: ContractChatModel, userOrmEntityLoader: DataLoader<string, UserOrmEntity>): Promise<UserModel | null>;
    tenant(contract: ContractChatModel, userOrmEntityLoader: DataLoader<string, UserOrmEntity>): Promise<UserModel | null>;
    innopayPaymentPageModel(iam: UserOrmEntity, contract: ContractChatModel, innopayPaymentPageLoader: DataLoader<string, InnopayPaymentPageData | undefined>): Promise<InnopayPaymentPageModel | null>;
}
