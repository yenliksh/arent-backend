import { ApartmentAdViewModel } from '@domains/apartment-ad/models/apartment-ad.model';
import { BaseContractModel } from '@domains/contract/models/contract.model';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import DataLoader from 'dataloader';
import { UserModel } from 'src/rental-context/domains/user/models/user.model';
import { ContractRequestModel } from '../models/contract-request.model';
export declare class ContractRequestGraphqlResolver {
    tenant(contractRequest: ContractRequestModel, userLoader: DataLoader<string, UserOrmEntity | undefined>): Promise<UserModel | undefined>;
    apartmentAd(contractRequest: ContractRequestModel, apartmentAdLoader: DataLoader<string, ApartmentAdOrmEntity | undefined>): Promise<ApartmentAdViewModel | undefined>;
    contract(contractRequest: ContractRequestModel, contractLoader: DataLoader<string, ContractOrmEntity | undefined>): Promise<BaseContractModel | undefined>;
}
