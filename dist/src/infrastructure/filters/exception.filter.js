"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const apollo_server_core_1 = require("apollo-server-core");
const http_status_codes_1 = require("http-status-codes");
let ExceptionFilter = class ExceptionFilter {
    constructor(configService) {
        this.configService = configService;
        const env = configService.get('nodeEnv');
        this.isDebug = ['development', 'staging'].includes(env);
    }
    catch(exception, host) {
        const exceptionResponse = exception.getResponse();
        const contextType = host.getType();
        if (this.isDebug) {
            common_1.Logger.error(exception, exception.stack, 'ExceptionFilter');
            common_1.Logger.verbose(JSON.stringify(exception, null, 2), 'ExceptionFilter');
        }
        switch (contextType) {
            case ContextType.GRAPHQL:
                return this.handleGraphqlContext(exception, exceptionResponse);
            case ContextType.HTTP:
                return this.handleHttpContext(exception, host);
            default:
                return this.handleGraphqlContext(exception, exceptionResponse);
        }
    }
    handleGraphqlContext(exception, exceptionResponse) {
        const response = typeof exceptionResponse === 'string'
            ? {
                message: exceptionResponse,
            }
            : exceptionResponse;
        switch (exception.getStatus()) {
            case http_status_codes_1.StatusCodes.BAD_REQUEST:
                return new apollo_server_core_1.UserInputError(exception.message, {
                    invalidArgs: response.message,
                });
            case http_status_codes_1.StatusCodes.UNAUTHORIZED:
                return new apollo_server_core_1.AuthenticationError(exception.message);
            case http_status_codes_1.StatusCodes.FORBIDDEN:
                return new apollo_server_core_1.ForbiddenError(exception.message);
            default:
                return new apollo_server_core_1.ApolloError(exception.message, exception.getStatus().toString(), {
                    validationErrors: response.message,
                });
        }
    }
    handleHttpContext(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const message = exception.getResponse().message;
        response.status(status).send({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message,
        });
    }
};
ExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ExceptionFilter);
exports.ExceptionFilter = ExceptionFilter;
var ContextType;
(function (ContextType) {
    ContextType["GRAPHQL"] = "graphql";
    ContextType["HTTP"] = "http";
})(ContextType || (ContextType = {}));
//# sourceMappingURL=exception.filter.js.map