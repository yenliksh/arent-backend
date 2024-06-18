import { PaymentInvoiceOrmEntity } from '@infrastructure/database/entities/payment-invoice.orm-entity';
import { PaginationResult } from '@libs/utils/cursor-paginator';
import { PaymentInvoiceModel } from '../models/payment-invoice.model';
declare const PaymentInvoicesPaginationResponse_base: import("@nestjs/common").Type<import("@infrastructure/dto/base-cursor-pagination.response").IBaseCursorPaginationResponse<PaymentInvoiceModel>>;
export declare class PaymentInvoicesPaginationResponse extends PaymentInvoicesPaginationResponse_base {
    static create(props: PaginationResult<PaymentInvoiceOrmEntity>): PaymentInvoicesPaginationResponse;
}
export {};
