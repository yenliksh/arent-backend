import { ApartmentAdViewModel } from '@domains/apartment-ad/models/apartment-ad.model';
import { BaseContractModel } from '@domains/contract/models/contract.model';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ApartmentAdOrmEntityLoader } from '@infrastructure/dataloader/apartment-ad.dataloader';
import { UserOrmEntityLoader } from '@infrastructure/dataloader/user.dataloader';
import { Loader } from '@libs/dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { UserModel } from 'src/rental-context/domains/user/models/user.model';

import { ContractByContractRequestIdLoader } from '../dataloader/contract-by-contract-request-id.dataloader';
import { ContractRequestModel } from '../models/contract-request.model';

@Resolver(() => ContractRequestModel)
export class ContractRequestGraphqlResolver {
  @ResolveField(() => UserModel)
  async tenant(
    @Parent() contractRequest: ContractRequestModel,
    @Loader(UserOrmEntityLoader.name) userLoader: DataLoader<string, UserOrmEntity | undefined>,
  ): Promise<UserModel | undefined> {
    const { tenantId, tenant } = contractRequest;

    if (tenant) {
      return tenant;
    }

    const result = tenantId ? await userLoader.load(tenantId) : undefined;

    return result ? UserModel.create(result) : undefined;
  }

  @ResolveField(() => ApartmentAdViewModel)
  async apartmentAd(
    @Parent() contractRequest: ContractRequestModel,
    @Loader(ApartmentAdOrmEntityLoader.name) apartmentAdLoader: DataLoader<string, ApartmentAdOrmEntity | undefined>,
  ): Promise<ApartmentAdViewModel | undefined> {
    const { apartmentAdId, apartmentAd } = contractRequest;

    if (apartmentAd) {
      return apartmentAd;
    }

    const result = apartmentAdId ? await apartmentAdLoader.load(apartmentAdId) : undefined;

    return result ? ApartmentAdViewModel.create(result) : undefined;
  }

  @ResolveField(() => BaseContractModel)
  async contract(
    @Parent() contractRequest: ContractRequestModel,
    @Loader(ContractByContractRequestIdLoader.name) contractLoader: DataLoader<string, ContractOrmEntity | undefined>,
  ): Promise<BaseContractModel | undefined> {
    const { id, contract } = contractRequest;

    if (contract) {
      return contract;
    }

    const result = await contractLoader.load(id);

    return result ? new BaseContractModel(result) : undefined;
  }
}
