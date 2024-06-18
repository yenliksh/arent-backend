import { ApartmentAdModel } from '@domains/apartment-ad/models/apartment-ad.model';
import { ContractLandlordModel } from '@domains/contract/models/contract.model';
import { NextPaymentInfoModel } from '@domains/contract/models/sub-models/next-payment-info.model';
import { UserMeModel, UserModel } from '@domains/user/models/user.model';
import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ApartmentAdOrmEntityLoader } from '@infrastructure/dataloader/apartment-ad.dataloader';
import { PaymentTransactionOrmEntityLoader } from '@infrastructure/dataloader/payment-transaction.dataloader';
import { UserOrmEntityLoader } from '@infrastructure/dataloader/user.dataloader';
import { Loader } from '@libs/dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';

@Resolver(() => ContractLandlordModel)
export class ContractLandlordResolver {
  @ResolveField(() => ApartmentAdModel, { nullable: true })
  async apartmentAd(
    @Parent() contract: ContractLandlordModel,
    @Loader(ApartmentAdOrmEntityLoader.name) apartmentAdOrmEntityLoader: DataLoader<string, ApartmentAdOrmEntity>,
  ): Promise<ApartmentAdModel | null> {
    const { apartmentAdId, apartmentAd } = contract;

    if (!apartmentAdId) {
      return null;
    }

    if (apartmentAd) {
      return apartmentAd;
    }

    const result = await apartmentAdOrmEntityLoader.load(apartmentAdId);

    return ApartmentAdModel.create(result);
  }

  @ResolveField(() => UserMeModel, { nullable: true })
  async landlord(
    @Parent() contract: ContractLandlordModel,
    @Loader(UserOrmEntityLoader.name) userOrmEntityLoader: DataLoader<string, UserOrmEntity>,
  ): Promise<UserMeModel | null> {
    const { landlord, landlordId } = contract;

    if (!landlordId) {
      return null;
    }

    if (landlord) {
      return landlord;
    }

    const result = await userOrmEntityLoader.load(landlordId);

    return UserMeModel.create(result);
  }

  @ResolveField(() => UserModel, { nullable: true })
  async tenant(
    @Parent() contract: ContractLandlordModel,
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

  @ResolveField(() => NextPaymentInfoModel, { nullable: true })
  async nextPayment(
    @Parent() contract: ContractLandlordModel,
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
}
