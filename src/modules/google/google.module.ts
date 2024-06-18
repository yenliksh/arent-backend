import { googleMapsFactory } from '@infrastructure/configs/google-maps.factory';
import { Module } from '@nestjs/common';
import { GoogleMapsModule } from '@third-parties/google-maps/src';

import { GooglePlacesService } from './google-places/google-places.service';
import { GoogleController } from './google.controller';

@Module({
  imports: [GoogleMapsModule.forRootAsync(googleMapsFactory)],
  controllers: [GoogleController],
  providers: [GooglePlacesService],
  exports: [GooglePlacesService],
})
export class GoogleModule {}
