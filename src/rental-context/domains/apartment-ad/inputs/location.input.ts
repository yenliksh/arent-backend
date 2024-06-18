import { Field, Float, InputType } from '@nestjs/graphql';
import { IsDefined, IsLatitude, IsLongitude, IsPositive } from 'class-validator';

@InputType()
export class LocationInput {
  @IsDefined()
  @IsLatitude()
  @Field(() => Number)
  readonly lat: number;

  @IsDefined()
  @IsLongitude()
  @Field(() => Number)
  readonly lng: number;

  @IsDefined()
  @IsPositive()
  @Field(() => Float)
  readonly radiusInKm: number;
}
