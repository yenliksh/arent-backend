import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class ChangeTenantPaymentMethodRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String)
  readonly contractId: string;

  @IsDefined()
  @IsUUID('4')
  @Field(() => String)
  readonly cardId: string;
}
