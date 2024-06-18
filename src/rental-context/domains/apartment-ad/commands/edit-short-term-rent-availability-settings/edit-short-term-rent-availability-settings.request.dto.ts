import { DateISOValidator } from '@infrastructure/validators';
import { IsDateBeforeOrEqual } from '@infrastructure/validators/decorators/is-date-before-or-equal.decorator';
import { IsFutureDate } from '@infrastructure/validators/decorators/is-future-date.decorator';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsUUID, Max, Min, Validate, ValidateNested } from 'class-validator';

@InputType()
export class LockedDateInput {
  @IsDefined()
  @Validate(DateISOValidator)
  @IsDateBeforeOrEqual('endDate', { message: 'startDate must be a greater than endDate' })
  @IsFutureDate({ message: 'startDate must be a future date' })
  @Field(() => String, { description: 'iso date ex. YYYY-MM-DD' })
  startDate: string;

  @IsDefined()
  @Validate(DateISOValidator)
  @IsFutureDate({ message: 'endDate must be a future date' })
  @Field(() => String, { description: 'iso date ex. YYYY-MM-DD' })
  endDate: string;
}

@InputType()
export class EditShortTermRentAvailabilitySettingsRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'apartmentId' })
  readonly id: string;

  @IsDefined()
  @Min(1)
  @Max(12)
  @IsInt()
  @Field(() => Int)
  readonly bookingAccessInMonths: number;

  @IsDefined()
  @Type(() => LockedDateInput)
  @ValidateNested()
  @Field(() => [LockedDateInput])
  readonly lockedDates: LockedDateInput[];
}
