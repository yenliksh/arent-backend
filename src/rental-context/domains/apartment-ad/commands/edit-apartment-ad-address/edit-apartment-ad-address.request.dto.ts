import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsLatitude, IsLongitude, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class EditApartmentAdAddressRequest {
  @IsDefined()
  @IsUUID('4')
  @Field(() => String, { description: 'apartmentId' })
  readonly id: string;

  @IsDefined()
  @IsString()
  @Field(() => String)
  readonly country: string;

  @IsDefined()
  @IsString()
  @Field(() => String)
  readonly city: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly region?: string;

  @IsDefined()
  @IsString()
  @Field(() => String)
  readonly street: string;

  @IsDefined()
  @IsString()
  @Field(() => String)
  readonly houseNumber: string;

  @IsDefined()
  @IsLatitude()
  @Field(() => Number)
  readonly lat: number;

  @IsDefined()
  @IsLongitude()
  @Field(() => Number)
  readonly lng: number;
}
