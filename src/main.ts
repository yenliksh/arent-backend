require('newrelic');

import { resolve } from 'path';

import { ExceptionFilter } from '@infrastructure/filters/exception.filter';
import { SentryInterceptor } from '@infrastructure/interceptors/sentry.interceptor';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import * as SentryTracing from '@sentry/tracing';

import { AppModule } from './app.module';

const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging',
    displayRequestDuration: true,
    filter: true,
    syntaxHighlight: { activate: true, theme: 'agate' },
    tryItOutEnabled: true,
  },
  customfavIcon: '../favicon.ico',
};

const useSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Livin')
    .setVersion('0.0.1')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, customOptions);
};

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const configService = app.get(ConfigService);
  const env = configService.get<string>('nodeEnv');
  const port = configService.get<number>('port') as number;
  const sentryDsn = configService.get<string>('sentry.dsn');
  const corsClientUrls = configService.get<string[]>('corsClientUrls');

  app.useStaticAssets({
    root: resolve('./public'),
  });

  SentryTracing.addExtensionMethods();
  Sentry.init({
    dsn: sentryDsn,
    environment: env,
    debug: env === 'development',
    tracesSampleRate: 1.0,
  });

  app.useGlobalInterceptors(
    new SentryInterceptor({
      filters: {
        fromStatus: 500,
      },
    }),
  );

  app.enableCors({
    origin: env === 'development' || env === 'staging' ? '*' : corsClientUrls,
    credentials: env === 'development' || env === 'staging' ? false : true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new ExceptionFilter(configService));

  if (env === 'development' || env === 'staging') {
    useSwagger(app);
  } else {
    Logger.debug = () => {
      //disabled in production
    };
    Logger.verbose = () => {
      //disabled in production
    };
  }

  await app.listen(port, '0.0.0.0', () => {
    Logger.log(`Running on port ${port}`, 'NestApplication');
    Logger.log(`Environment ${env}`, 'NestApplication');
  });
}
bootstrap();
