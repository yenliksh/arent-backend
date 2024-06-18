import { PaymentInvoiceModel } from '@domains/payment-transaction/models/payment-invoice.model';
import { PaymentTransactionModel } from '@domains/payment-transaction/models/payment-transaction.model';
import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { PaymentTransactionOrmEntityLoader } from '@infrastructure/dataloader/payment-transaction.dataloader';
import { Loader } from '@libs/dataloader';
import { NotFoundException } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';

@Resolver(() => PaymentInvoiceModel)
export class PaymentInvoiceResolver {
  @ResolveField(() => PaymentTransactionModel)
  async paymentTransaction(
    @Parent() paymentInvoice: PaymentInvoiceModel,
    @Loader(PaymentTransactionOrmEntityLoader.name)
    loader: DataLoader<string, PaymentTransactionOrmEntity | undefined>,
  ) {
    const { paymentTransactionId, paymentTransaction } = paymentInvoice;

    if (paymentTransaction) {
      return paymentTransaction;
    }

    const result = await loader.load(paymentTransactionId);

    if (!result) {
      throw new NotFoundException('Contract not found');
    }

    return PaymentTransactionModel.create(result);
  }
}
