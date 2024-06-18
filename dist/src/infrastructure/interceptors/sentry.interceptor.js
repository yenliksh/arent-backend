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
exports.SentryInterceptor = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const Sentry = require("@sentry/node");
const apollo_server_core_1 = require("apollo-server-core");
const operators_1 = require("rxjs/operators");
let SentryInterceptor = class SentryInterceptor {
    constructor(options) {
        this.options = options;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.tap)(null, (exception) => {
            if (this.shouldReport(exception)) {
                Sentry.withScope((scope) => {
                    switch (context.getType()) {
                        case 'http':
                            return this.captureHttpException(scope, context.switchToHttp(), exception);
                        case 'ws':
                            return this.captureWsException(scope, context.switchToWs(), exception);
                        case 'graphql':
                            return this.captureGraphqlException(scope, graphql_1.GqlExecutionContext.create(context), exception);
                    }
                });
            }
        }));
    }
    captureHttpException(scope, http, exception) {
        const req = http.getRequest();
        const user = req.user;
        const transaction = Sentry.startTransaction({
            name: req.url,
        });
        if (user) {
            scope.setUser({
                id: user.id,
                role: user.role,
            });
        }
        const data = Sentry.Handlers.parseRequest({}, req, {
            ip: true,
        });
        scope.setExtra('req', data.request);
        Sentry.captureException(exception);
        transaction.finish();
    }
    captureWsException(scope, ws, exception) {
        const transaction = Sentry.startTransaction({
            name: 'websocket error',
        });
        scope.setExtra('ws_client', ws.getClient());
        scope.setExtra('ws_data', ws.getData());
        Sentry.captureException(exception);
        transaction.finish();
    }
    captureGraphqlException(scope, context, exception) {
        var _a, _b;
        const req = context.getContext().req;
        const user = req.user;
        if (exception instanceof apollo_server_core_1.UserInputError) {
            return;
        }
        const transaction = Sentry.startTransaction({
            name: exception.message,
        });
        if (user) {
            scope.setUser({
                id: user.id,
                role: user.role,
            });
        }
        const data = Sentry.Handlers.parseRequest({}, req, {
            ip: true,
        });
        scope.setExtra('req', data.request);
        ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.query) && scope.setExtra('query', req.body.query);
        ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.variables) && scope.setExtra('variables', req.body.variables);
        Sentry.captureException(exception);
        transaction.finish();
    }
    shouldReport(exception) {
        var _a;
        if (this.options && !this.options.filters)
            return true;
        if (this.options) {
            if ((_a = this.options.filters) === null || _a === void 0 ? void 0 : _a.fromStatus) {
                if (exception.status) {
                    return exception.status >= this.options.filters.fromStatus;
                }
                else {
                    return true;
                }
            }
            return true;
        }
        else {
            return true;
        }
    }
};
SentryInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], SentryInterceptor);
exports.SentryInterceptor = SentryInterceptor;
//# sourceMappingURL=sentry.interceptor.js.map