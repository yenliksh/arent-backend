import { GuestsInput } from '@domains/contract-request/commands/send-request/send-request.request.dto';
import { ShortTermRentPaymentType } from '@infrastructure/enums';
import { DateISOValidator } from '@infrastructure/validators';
import { IsDateBefore } from '@infrastructure/validators/decorators/is-date-before.decorator';
import { IsFutureDate } from '@infrastructure/validators/decorators/is-future-date.decorator';
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDefined, IsEnum, IsOptional, IsString, IsUUID, Validate, ValidateNested } from 'class-validator';

@InputType()
export class ContractTemporaryInstantConcludeRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String)
  readonly apartmentAdId: string;

  @IsDefined()
  @Validate(DateISOValidator)
  @IsDateBefore('departureDate')
  @IsFutureDate()
  @Field(() => String)
  readonly arrivalDate: string;

  @IsDefined()
  @Validate(DateISOValidator)
  @Field(() => String)
  readonly departureDate: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => GuestsInput)
  @Field(() => GuestsInput)
  readonly guests: GuestsInput;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly comment?: string;

  @IsDefined()
  @IsEnum(ShortTermRentPaymentType)
  @Field(() => ShortTermRentPaymentType)
  readonly rentPaymentType: ShortTermRentPaymentType;
}
