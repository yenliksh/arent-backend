"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('newrelic');
const path_1 = require("path");
const exception_filter_1 = require("./infrastructure/filters/exception.filter");
const sentry_interceptor_1 = require("./infrastructure/interceptors/sentry.interceptor");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const Sentry = require("@sentry/node");
const SentryTracing = require("@sentry/tracing");
const app_module_1 = require("./app.module");
const customOptions = {
    swaggerOptions: {
        persistAuthorization: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging',
        displayRequestDuration: true,
        filter: true,
        syntaxHighlight: { activate: true, theme: 'agate' },
        tryItOutEnabled: true,
    },
    customfavIcon: '../favicon.ico',
};
const useSwagger = (app) => {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Livin')
        .setVersion('0.0.1')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document, customOptions);
};
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    const configService = app.get(config_1.ConfigService);
    const env = configService.get('nodeEnv');
    const port = configService.get('port');
    const sentryDsn = configService.get('sentry.dsn');
    const corsClientUrls = configService.get('corsClientUrls');
    app.useStaticAssets({
        root: (0, path_1.resolve)('./public'),
    });
    SentryTracing.addExtensionMethods();
    Sentry.init({
        dsn: sentryDsn,
        environment: env,
        debug: env === 'development',
        tracesSampleRate: 1.0,
    });
    app.useGlobalInterceptors(new sentry_interceptor_1.SentryInterceptor({
        filters: {
            fromStatus: 500,
        },
    }));
    app.enableCors({
        origin: env === 'development' || env === 'staging' ? '*' : corsClientUrls,
        credentials: env === 'development' || env === 'staging' ? false : true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.useGlobalFilters(new exception_filter_1.ExceptionFilter(configService));
    if (env === 'development' || env === 'staging') {
        useSwagger(app);
    }
    else {
        common_1.Logger.debug = () => {
        };
        common_1.Logger.verbose = () => {
        };
    }
    await app.listen(port, '0.0.0.0', () => {
        common_1.Logger.log(`Running on port ${port}`, 'NestApplication');
        common_1.Logger.log(`Environment ${env}`, 'NestApplication');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map