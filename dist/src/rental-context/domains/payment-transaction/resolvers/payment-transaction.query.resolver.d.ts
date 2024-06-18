import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { PaymentInvoicesPaginationResponse } from '../dtos/payment-invoices-pagination.response.dto';
import { PaymentTransactionModel } from '../models/payment-transaction.model';
import { NextPaymentTransactionService } from '../queries/next-payment-transaction/next-payment-transaction.service';
import { NextPaymentTransactionRequest } from '../queries/next-payment-transaction/next-payment-transactions.request.dto';
import { PaymentInvoicesHistoryRequest } from '../queries/payment-invoices-history/payment-invoices-history.request';
import { PaymentInvoicesHistoryService } from '../queries/payment-invoices-history/payment-invoices-history.service';
export declare class PaymentTransactionQueryGraphqlResolver {
    private readonly paymentInvoicesHistoryService;
    private readonly nextPaymentTransactionService;
    constructor(paymentInvoicesHistoryService: PaymentInvoicesHistoryService, nextPaymentTransactionService: NextPaymentTransactionService);
    invoiceHistory(iam: UserOrmEntity, input: PaymentInvoicesHistoryRequest): Promise<PaymentInvoicesPaginationResponse>;
    nextPayment(iam: UserOrmEntity, input: NextPaymentTransactionRequest): Promise<PaymentTransactionModel[]>;
}
