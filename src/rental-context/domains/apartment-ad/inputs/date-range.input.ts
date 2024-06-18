import { DateISOValidator } from '@infrastructure/validators';
import { IsDateBeforeOrEqual } from '@infrastructure/validators/decorators/is-date-before-or-equal.decorator';
import { IsFutureDate } from '@infrastructure/validators/decorators/is-future-date.decorator';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Validate } from 'class-validator';

@InputType()
export class DateRangeInput {
  // @ValidateIf((obj) => obj.startDate) maybe?
  @IsOptional()
  @Validate(DateISOValidator)
  @IsDateBeforeOrEqual('endDate')
  @IsFutureDate({ message: 'startDate is not future' })
  @Field(() => String, { nullable: true, description: 'must be date ex. YYYY-MM-DD' })
  readonly startDate?: string;

  // @ValidateIf((obj) => obj.endDate) maybe?
  @IsOptional()
  @Validate(DateISOValidator)
  @IsFutureDate({ message: 'endDate is not future' })
  @Field(() => String, { nullable: true, description: 'must be date ex. YYYY-MM-DD' })
  readonly endDate?: string; // readonly endDate?: string maybe?
}
