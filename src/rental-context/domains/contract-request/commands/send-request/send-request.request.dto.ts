import { IGuests } from '@domain-value-objects/apartment-guests.value-object';
import { ApartmentRentPeriodType, ShortTermRentBookingType, ShortTermRentPaymentType } from '@infrastructure/enums';
import { DateISOValidator } from '@infrastructure/validators';
import { IsDateBefore } from '@infrastructure/validators/decorators/is-date-before.decorator';
import { IsFutureDate } from '@infrastructure/validators/decorators/is-future-date.decorator';
import { Field, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

@InputType()
export class GuestsInput implements IGuests {
  @IsDefined()
  @IsInt()
  @Min(0)
  @Field(() => Int)
  readonly numberOfChildren: number;

  @IsDefined()
  @IsInt()
  @Min(0)
  @Field(() => Int)
  readonly numberOfAdult: number;

  @IsDefined()
  @IsInt()
  @Min(0)
  @Field(() => Int)
  readonly numberOfPets: number;
}

@InputType()
export class SendRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String)
  readonly apartmentAdId: string;

  @IsDefined()
  @IsEnum(ApartmentRentPeriodType)
  @Field(() => ApartmentRentPeriodType)
  readonly apartmentRentPeriodType: ApartmentRentPeriodType;

  @ValidateIf((obj) => obj.apartmentRentPeriodType === ApartmentRentPeriodType.SHORT_TERM)
  @IsDefined()
  @Validate(DateISOValidator)
  @IsDateBefore('departureDate')
  @IsFutureDate()
  @Field(() => String, { nullable: true, description: 'only for short term rent period' })
  readonly arrivalDate?: string;

  @ValidateIf((obj) => obj.apartmentRentPeriodType === ApartmentRentPeriodType.SHORT_TERM)
  @IsDefined()
  @Validate(DateISOValidator)
  @Field(() => String, { nullable: true, description: 'only for short term rent period' })
  readonly departureDate?: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => GuestsInput)
  @Field(() => GuestsInput)
  readonly guests: GuestsInput;

  @ValidateIf((obj) => obj.apartmentRentPeriodType === ApartmentRentPeriodType.SHORT_TERM)
  @IsDefined()
  @IsEnum(ShortTermRentBookingType)
  @Field(() => ShortTermRentBookingType, { nullable: true, description: 'only for short term rent period' })
  readonly rentBookingType?: ShortTermRentBookingType;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly comment?: string;

  @ValidateIf((obj) => obj.rentBookingType === ShortTermRentBookingType.INSTANT)
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { nullable: true, description: 'only for instant booking' })
  readonly cardId?: string;

  @ValidateIf((obj) => obj.apartmentRentPeriodType === ApartmentRentPeriodType.SHORT_TERM)
  @IsDefined()
  @IsEnum(ShortTermRentPaymentType)
  @Field(() => ShortTermRentPaymentType, { nullable: true, description: 'only for short term rent period' })
  readonly rentPaymentType?: ShortTermRentPaymentType;
}
