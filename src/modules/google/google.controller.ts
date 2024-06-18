import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Language } from 'src/i18n/types';

import { GetPlaceDetailsByCoordsDto, GetPlaceDetailsDto, GetPlacesDto } from './google-places/google-places.dto';
import { GooglePlacesService } from './google-places/google-places.service';

@Controller('v1/google')
@ApiTags('Google')
@ApiBearerAuth()
@UsePipes()
export class GoogleController {
  constructor(private googlePlacesService: GooglePlacesService) {}

  @ApiOperation({
    summary: 'Get places',
  })
  @Get('places')
  public async getPlaces(@I18n() { lang }: I18nContext, @Query() dto: GetPlacesDto) {
    return this.googlePlacesService.getLocation(dto.address, lang as Language);
  }

  @ApiOperation({
    summary: 'Get details',
  })
  @Get('placeDetails')
  public async getAddress(@I18n() { lang }: I18nContext, @Query() dto: GetPlaceDetailsDto) {
    return this.googlePlacesService.getPlaceDetails(dto.placeId, lang as Language);
  }

  @ApiOperation({
    summary: 'Get details by coords',
  })
  @Get('placeDetailsByCoords')
  public async getAddressByCoords(@I18n() { lang }: I18nContext, @Query() dto: GetPlaceDetailsByCoordsDto) {
    return this.googlePlacesService.getPlaceDetailsByCoords(dto.lat, dto.lng, lang as Language);
  }
}
