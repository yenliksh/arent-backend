import { ConfigService } from '@nestjs/config';
import { GoogleMapsModuleOptions } from '@third-parties/google-maps/src';
export declare const googleMapsFactory: {
    useFactory: (configService: ConfigService) => GoogleMapsModuleOptions;
    inject: (typeof ConfigService)[];
};
