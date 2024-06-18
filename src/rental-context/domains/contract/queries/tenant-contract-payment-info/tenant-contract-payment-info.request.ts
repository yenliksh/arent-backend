import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class TenantContractPaymentInfoRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'contractId' })
  readonly id: string;
}
