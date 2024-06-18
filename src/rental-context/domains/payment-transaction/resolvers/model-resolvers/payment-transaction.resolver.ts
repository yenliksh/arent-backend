import { BaseContractModel } from '@domains/contract/models/contract.model';
import { ContractOrmEntity } from '@infrastructure/database/entities/contract.orm-entity';
import { ContractOrmEntityLoader } from '@infrastructure/dataloader/contract.dataloader';
import { Loader } from '@libs/dataloader';
import { NotFoundException } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';

import { PaymentTransactionModel } from '../../models/payment-transaction.model';

@Resolver(() => PaymentTransactionModel)
export class PaymentTransactionResolver {
  @ResolveField(() => BaseContractModel)
  async contract(
    @Parent() paymentTransaction: PaymentTransactionModel,
    @Loader(ContractOrmEntityLoader.name) apartmentAdOrmEntityLoader: DataLoader<string, ContractOrmEntity | undefined>,
  ): Promise<BaseContractModel> {
    const { contract, contractId } = paymentTransaction;

    if (contract) {
      return contract;
    }

    const result = await apartmentAdOrmEntityLoader.load(contractId);

    if (!result) {
      throw new NotFoundException('Contract not found');
    }

    return new BaseContractModel(result);
  }
}
