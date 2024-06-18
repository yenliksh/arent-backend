import { ConfigService } from '@nestjs/config';
import { GoogleMapsModuleOptions } from '@third-parties/google-maps/src';

export const googleMapsFactory = {
  useFactory: (configService: ConfigService): GoogleMapsModuleOptions => {
    return {
      key: configService.get<string>('googleMaps.apiKey') as string,
    };
  },
  inject: [ConfigService],
};
