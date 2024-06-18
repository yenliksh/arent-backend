import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class TenantManuallyPayRequest {
  @IsDefined()
  @IsUUID()
  @Field(() => String)
  readonly id: string;
}
