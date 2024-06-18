import { PaymentHistorySearchType } from '@domains/payment-transaction/types';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from 'class-validator';

@InputType()
export class NextPaymentTransactionRequest {
  @IsDefined()
  @IsEnum(PaymentHistorySearchType)
  @Field(() => PaymentHistorySearchType)
  readonly paymentSearchType: PaymentHistorySearchType;
}
