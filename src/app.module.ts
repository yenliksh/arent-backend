import * as path from 'path';

import { bullConfigFactory } from '@infrastructure/configs/bull.factory';
import { loadConfiguration, validationSchema } from '@infrastructure/configs/environment.config';
import { GraphQLConfigService } from '@infrastructure/configs/graphql-config.service';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { LocalizedProblemInterceptor } from '@infrastructure/interceptors';
import { DataLoaderInterceptor } from '@libs/dataloader';
import { DataloaderModule } from '@libs/dataloader/dataloader.module';
import { AdminPanelModule } from '@modules/admin-panel/admin-panel.module';
import { AuthModule } from '@modules/auth/auth.module';
import { AwsModule } from '@modules/aws/aws.module';
import { GoogleModule } from '@modules/google/google.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { UserPanelModule } from '@modules/user-panel/user-panel.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';

import { AppController } from './app.controller';
import { RentalContextModule } from './rental-context/rental-context.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphQLConfigService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadConfiguration],
      validationSchema: validationSchema,
      validationOptions: { abortEarly: true },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '../i18n/'),
        watch: true,
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver],
    }),
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 20,
      verboseMemoryLeak: true,
      ignoreErrors: false,
    }),
    BullModule.forRootAsync(bullConfigFactory),
    DataloaderModule,
    AdminPanelModule,
    AuthModule,
    DatabaseModule,
    AwsModule,
    GoogleModule,
    RentalContextModule,
    NotificationsModule,
    UserPanelModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LocalizedProblemInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class AppModule {}
