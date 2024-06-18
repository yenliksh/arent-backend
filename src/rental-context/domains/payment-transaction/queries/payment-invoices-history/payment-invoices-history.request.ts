import { PaymentHistorySearchType } from '@domains/payment-transaction/types';
import { BaseAfterCursorPaginateRequest } from '@infrastructure/inputs/base-cursor-pagination.request.dto';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from 'class-validator';

@InputType()
export class PaymentInvoicesHistoryRequest extends BaseAfterCursorPaginateRequest {
  @IsDefined()
  @IsEnum(PaymentHistorySearchType)
  @Field(() => PaymentHistorySearchType)
  readonly paymentSearchType: PaymentHistorySearchType;
}
