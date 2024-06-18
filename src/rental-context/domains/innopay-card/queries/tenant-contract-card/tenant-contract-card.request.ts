import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class TenantContractCardRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'contractId' })
  readonly id: string;
}
