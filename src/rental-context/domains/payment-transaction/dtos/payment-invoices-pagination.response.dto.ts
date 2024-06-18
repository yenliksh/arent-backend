import { PaymentInvoiceOrmEntity } from '@infrastructure/database/entities/payment-invoice.orm-entity';
import { BaseAfterCursorPaginationResponse } from '@infrastructure/dto/base-cursor-pagination.response';
import { PaginationResult } from '@libs/utils/cursor-paginator';
import { ObjectType } from '@nestjs/graphql';

import { PaymentInvoiceModel } from '../models/payment-invoice.model';

@ObjectType('PaymentInvoicePayload')
export class PaymentInvoicesPaginationResponse extends BaseAfterCursorPaginationResponse(PaymentInvoiceModel) {
  static create(props: PaginationResult<PaymentInvoiceOrmEntity>) {
    const payload = new PaymentInvoicesPaginationResponse();

    payload.data = props.data.map(PaymentInvoiceModel.create);
    payload.pageInfo = props.pageInfo;

    return payload;
  }
}
