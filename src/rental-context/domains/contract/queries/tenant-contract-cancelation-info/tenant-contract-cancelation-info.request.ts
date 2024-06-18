import { DateISOValidator } from '@infrastructure/validators';
import { IsFutureDate } from '@infrastructure/validators/decorators/is-future-date.decorator';
import { Optional } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID, Validate } from 'class-validator';

@InputType()
export class TenantContractCancelationInfoRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'contractId' })
  readonly id: string;

  @Optional()
  @Validate(DateISOValidator)
  @IsFutureDate({ message: 'checkoutDate must be a future date' })
  @Field(() => String, { nullable: true, description: 'local checkout date in ISO ex. YYYY-MM-DD' })
  readonly checkoutDate?: string;
}
