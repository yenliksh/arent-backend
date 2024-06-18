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
import { ApartmentAdOrmEntityLoader } from '@infrastructure/dataloader/apartment-ad.dataloader';
import { ContractCancelationOrmEntityLoader } from '@infrastructure/dataloader/contract-cancelation.dataloader';
import { InnopayCardOrmEntityLoader } from '@infrastructure/dataloader/innopay-card.dataloader';
import { PaymentTransactionOrmEntityLoader } from '@infrastructure/dataloader/payment-transaction.dataloader';
import { UserOrmEntityLoader } from '@infrastructure/dataloader/user.dataloader';
import { Loader } from '@libs/dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';

@Resolver(() => ContractTenantModel)
export class ContractTenantResolver {
  @ResolveField(() => ApartmentAdViewModel, { nullable: true })
  async apartmentAd(
    @Parent() contract: ContractTenantModel,
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
    @Parent() contract: ContractTenantModel,
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

  @ResolveField(() => UserMeModel, { nullable: true })
  async tenant(
    @Parent() contract: ContractTenantModel,
    @Loader(UserOrmEntityLoader.name) userOrmEntityLoader: DataLoader<string, UserOrmEntity>,
  ): Promise<UserMeModel | null> {
    const { tenant, tenantId } = contract;

    if (!tenantId) {
      return null;
    }

    if (tenant) {
      return tenant;
    }

    const result = await userOrmEntityLoader.load(tenantId);

    return UserMeModel.create(result);
  }

  @ResolveField(() => InnopayCardModel, { nullable: true })
  async innopayCard(
    @Parent() contract: ContractTenantModel,
    @Loader(InnopayCardOrmEntityLoader.name) innopayCardOrmEntityLoader: DataLoader<string, InnopayCardOrmEntity>,
  ): Promise<InnopayCardModel | null> {
    const { innopayCard, innopayCardId } = contract;

    if (!innopayCardId) {
      return null;
    }

    if (innopayCard) {
      return innopayCard;
    }

    const result = await innopayCardOrmEntityLoader.load(innopayCardId);

    return InnopayCardModel.create(result);
  }

  @ResolveField(() => NextPaymentInfoModel, { nullable: true })
  async nextPayment(
    @Parent() contract: ContractTenantModel,
    @Loader(PaymentTransactionOrmEntityLoader.name)
    paymentTransactionOrmEntityLoader: DataLoader<string, PaymentTransactionOrmEntity>,
  ): Promise<NextPaymentInfoModel | null> {
    const { nextPayment, nextPaymentTransactionId } = contract;

    if (!nextPaymentTransactionId) {
      return null;
    }

    if (nextPayment) {
      return nextPayment;
    }

    const result = await paymentTransactionOrmEntityLoader.load(nextPaymentTransactionId);

    return NextPaymentInfoModel.create(result);
  }

  @ResolveField(() => ContractCancelationModel, { nullable: true })
  async contractCancelation(
    @Parent() contract: ContractTenantModel,
    @Loader(ContractCancelationOrmEntityLoader.name)
    contractCancelationOrmEntityLoader: DataLoader<string, ContractCancelationOrmEntity | undefined>,
  ): Promise<ContractCancelationModel | null> {
    const { id, contractCancelation } = contract;

    if (contractCancelation) {
      return contractCancelation;
    }

    const result = await contractCancelationOrmEntityLoader.load(id);

    if (!result) {
      return null;
    }

    return ContractCancelationModel.create(result);
  }
}
