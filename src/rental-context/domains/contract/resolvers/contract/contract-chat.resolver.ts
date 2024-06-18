import { ApartmentAdViewModel } from '@domains/apartment-ad/models/apartment-ad.model';
import { InnopayPaymentPageData } from '@domains/contract/domain/types';
import { ContractChatModel } from '@domains/contract/models/contract.model';
import { InnopayPaymentPageModel } from '@domains/contract/models/sub-models/innopay-payment-page.model';
import { UserModel } from '@domains/user/models/user.model';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ApartmentAdOrmEntityLoader } from '@infrastructure/dataloader/apartment-ad.dataloader';
import { InnopayPaymentPageByContractIdLoader } from '@infrastructure/dataloader/innopay-payment-page-by-contract-id.dataloader';
import { UserOrmEntityLoader } from '@infrastructure/dataloader/user.dataloader';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { Loader } from '@libs/dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';

@Resolver(() => ContractChatModel)
export class ContractChatResolver {
  @ResolveField(() => ApartmentAdViewModel, { nullable: true })
  async apartmentAd(
    @Parent() contract: ContractChatModel,
    @Loader(ApartmentAdOrmEntityLoader.name) apartmentAdOrmEntityLoader: DataLoader<string, ApartmentAdOrmEntity>,
  ): Promise<ApartmentAdViewModel | null> {
    const { apartmentAdId, apartmentAd } = contract;

    if (!apartmentAdId) {
      return null;
    }

    if (apartmentAd) {
      return apartmentAd;
    }

    const result = await apartmentAdOrmEntityLoader.load(apartmentAdId);

    return ApartmentAdViewModel.create(result);
  }

  @ResolveField(() => UserModel, { nullable: true })
  async landlord(
    @Parent() contract: ContractChatModel,
    @Loader(UserOrmEntityLoader.name) userOrmEntityLoader: DataLoader<string, UserOrmEntity>,
  ): Promise<UserModel | null> {
    const { landlord, landlordId } = contract;

    if (!landlordId) {
      return null;
    }

    if (landlord) {
      return landlord;
    }

    const result = await userOrmEntityLoader.load(landlordId);

    return UserModel.create(result);
  }

  @ResolveField(() => UserModel, { nullable: true })
  async tenant(
    @Parent() contract: ContractChatModel,
    @Loader(UserOrmEntityLoader.name) userOrmEntityLoader: DataLoader<string, UserOrmEntity>,
  ): Promise<UserModel | null> {
    const { tenant, tenantId } = contract;

    if (!tenantId) {
      return null;
    }

    if (tenant) {
      return tenant;
    }

    const result = await userOrmEntityLoader.load(tenantId);

    return UserModel.create(result);
  }

  // for tenant only
  @ResolveField(() => InnopayPaymentPageModel, { nullable: true })
  async innopayPaymentPageModel(
    @IAM() iam: UserOrmEntity,
    @Parent() contract: ContractChatModel,
    @Loader(InnopayPaymentPageByContractIdLoader.name)
    innopayPaymentPageLoader: DataLoader<string, InnopayPaymentPageData | undefined>,
  ): Promise<InnopayPaymentPageModel | null> {
    const { innopayPaymentPageModel, id, tenantId } = contract;

    if (!iam || tenantId !== iam.id) {
      return null;
    }

    if (innopayPaymentPageModel) {
      return innopayPaymentPageModel;
    }

    const result = await innopayPaymentPageLoader.load(id);

    return result ? InnopayPaymentPageModel.create(result) : null;
  }
}
