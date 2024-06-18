import { DynamicModule } from '@nestjs/common';
import { GoogleMapsModuleAsyncOptions } from './google-maps.types';
export declare class GoogleMapsModule {
    static forRootAsync(options: GoogleMapsModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
