import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { PaymentInvoicesPaginationResponse } from '../dtos/payment-invoices-pagination.response.dto';
import { PaymentTransactionModel } from '../models/payment-transaction.model';
import { NextPaymentTransactionService } from '../queries/next-payment-transaction/next-payment-transaction.service';
import { NextPaymentTransactionRequest } from '../queries/next-payment-transaction/next-payment-transactions.request.dto';
import { PaymentInvoicesHistoryRequest } from '../queries/payment-invoices-history/payment-invoices-history.request';
import { PaymentInvoicesHistoryService } from '../queries/payment-invoices-history/payment-invoices-history.service';

@Resolver()
export class PaymentTransactionQueryGraphqlResolver {
  constructor(
    private readonly paymentInvoicesHistoryService: PaymentInvoicesHistoryService,
    private readonly nextPaymentTransactionService: NextPaymentTransactionService,
  ) {}

  @UseGuards(JwtAuthGuard())
  @Query(() => PaymentInvoicesPaginationResponse, { name: 'paymentTransaction_historyInvoice' })
  async invoiceHistory(
    @IAM() iam: UserOrmEntity,
    @Args('input') input: PaymentInvoicesHistoryRequest,
  ): Promise<PaymentInvoicesPaginationResponse> {
    const result = await this.paymentInvoicesHistoryService.handle(iam.id, input);

    return PaymentInvoicesPaginationResponse.create(result.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Query(() => [PaymentTransactionModel], { name: 'paymentTransaction_paymentNext' })
  async nextPayment(
    @IAM() iam: UserOrmEntity,
    @Args('input') input: NextPaymentTransactionRequest,
  ): Promise<PaymentTransactionModel[]> {
    const result = await this.nextPaymentTransactionService.handle(new UUID(iam.id), input.paymentSearchType);

    return result.unwrap().map(PaymentTransactionModel.create);
  }
}
