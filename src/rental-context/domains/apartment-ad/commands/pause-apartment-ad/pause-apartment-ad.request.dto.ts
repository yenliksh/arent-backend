import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsUUID } from 'class-validator';

@InputType()
export class PauseApartmentAdRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'apartmentId' })
  readonly id: string;

  @IsDefined()
  @Field(() => ApartmentRentPeriodType, {
    description: 'rentPeriodType',
  })
  readonly periodType: ApartmentRentPeriodType;
}
