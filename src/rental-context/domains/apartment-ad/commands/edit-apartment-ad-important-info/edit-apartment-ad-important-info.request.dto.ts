import { ShortTermRentBookingType, ShortTermRentCancellationPolicyType } from '@infrastructure/enums';
import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsDefined, IsEnum, IsMilitaryTime, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class EditApartmentAdImportantInfoRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'apartmentId' })
  readonly id: string;

  @IsDefined()
  @IsBoolean()
  @Field(() => Boolean)
  readonly allowedWithPets: boolean;

  @IsDefined()
  @IsBoolean()
  @Field(() => Boolean)
  readonly allowedWithChildren: boolean;

  @IsDefined()
  @IsBoolean()
  @Field(() => Boolean)
  readonly allowedToSmoke: boolean;

  @IsDefined()
  @IsBoolean()
  @Field(() => Boolean)
  readonly allowedToHangingOut: boolean;

  @IsOptional()
  @IsEnum(ShortTermRentCancellationPolicyType)
  @Field(() => ShortTermRentCancellationPolicyType, {
    nullable: true,
    description: 'only for short term rent period or all types',
  })
  readonly cancellationPolicy?: ShortTermRentCancellationPolicyType;

  @IsOptional()
  @IsEnum(ShortTermRentBookingType)
  @Field(() => ShortTermRentBookingType, {
    nullable: true,
    description: 'only for short term rent period or all types',
  })
  readonly rentBookingType?: ShortTermRentBookingType;

  @IsOptional()
  @IsString()
  @IsMilitaryTime()
  @Field(() => String, { nullable: true, description: 'only for short term rent period or all types' })
  readonly arrivalTime?: string;

  @IsOptional()
  @IsString()
  @IsMilitaryTime()
  @Field(() => String, { nullable: true, description: 'only for short term rent period or all types' })
  readonly departureTime?: string;
}
