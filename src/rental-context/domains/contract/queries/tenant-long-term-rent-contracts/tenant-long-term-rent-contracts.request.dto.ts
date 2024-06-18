import { ContractRentStatus } from '@infrastructure/enums';
import { BaseAfterCursorPaginateRequest } from '@infrastructure/inputs/base-cursor-pagination.request.dto';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from 'class-validator';

@InputType()
export class TenantLongTermRentContractsRequest extends BaseAfterCursorPaginateRequest {
  @IsDefined()
  @IsEnum(ContractRentStatus)
  @Field(() => ContractRentStatus)
  readonly type: ContractRentStatus;
}
