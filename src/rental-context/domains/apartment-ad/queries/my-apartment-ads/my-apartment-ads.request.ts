import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEnum } from 'class-validator';
import { ApartmentAdStatusType } from 'src/rental-context/domains/apartment-ad/domain/types';

@InputType()
export class MyApartmentAdsRequest {
  @IsDefined()
  @IsEnum(ApartmentAdStatusType)
  @Field(() => ApartmentAdStatusType)
  readonly status: ApartmentAdStatusType;
}
