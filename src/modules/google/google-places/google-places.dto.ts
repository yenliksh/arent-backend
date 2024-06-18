import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class GetPlacesDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  address: string;
}

export class GetPlaceDetailsDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  placeId: string;
}

export class GetPlaceDetailsByCoordsDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lat: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lng: string;
}
