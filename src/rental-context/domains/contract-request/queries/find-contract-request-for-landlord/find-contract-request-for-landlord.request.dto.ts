import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { BaseAfterCursorPaginateRequest } from '@infrastructure/inputs/base-cursor-pagination.request.dto';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from 'class-validator';

@InputType()
export class FindContractRequestForLandlordRequest extends BaseAfterCursorPaginateRequest {
  @IsDefined()
  @IsEnum(ApartmentRentPeriodType)
  @Field(() => ApartmentRentPeriodType)
  readonly type: ApartmentRentPeriodType;
}
