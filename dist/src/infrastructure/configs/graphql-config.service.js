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
exports.GraphQLConfigService = void 0;
const path_1 = require("path");
const authn_service_1 = require("../../modules/auth/services/authn.service");
const authz_service_1 = require("../../modules/auth/services/authz.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let GraphQLConfigService = class GraphQLConfigService {
    constructor(configService, authNService, authZService) {
        this.configService = configService;
        this.authNService = authNService;
        this.authZService = authZService;
        this.isProduction = configService.get('nodeEnv') === 'production';
    }
    createGqlOptions() {
        return {
            sortSchema: true,
            introspection: true,
            playground: !this.isProduction,
            autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
            context: this._createContext.bind(this),
            formatError: this._formatError.bind(this),
            cors: false,
            installSubscriptionHandlers: true,
            subscriptions: this._configSubscriptions(),
        };
    }
    _createContext({ req, connection }) {
        return {
            req: connection ? connection.context : req,
        };
    }
    _formatError(error) {
        var _a;
        if (error.message === 'VALIDATION_ERROR') {
            const extensions = {
                code: error.extensions.code,
                errors: [],
            };
            Object.keys((_a = error === null || error === void 0 ? void 0 : error.extensions) === null || _a === void 0 ? void 0 : _a.invalidArgs).forEach((key) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                const constraints = [];
                if (Array.isArray((_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.extensions) === null || _a === void 0 ? void 0 : _a.invalidArgs) === null || _b === void 0 ? void 0 : _b[key]) === null || _c === void 0 ? void 0 : _c.children)) {
                    Object.keys(((_f = (_e = (_d = error === null || error === void 0 ? void 0 : error.extensions) === null || _d === void 0 ? void 0 : _d.invalidArgs) === null || _e === void 0 ? void 0 : _e[key]) === null || _f === void 0 ? void 0 : _f.children) || []).forEach((_key2) => {
                        var _a, _b, _c, _d, _e, _f;
                        (((_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.extensions) === null || _a === void 0 ? void 0 : _a.invalidArgs) === null || _b === void 0 ? void 0 : _b[key]) === null || _c === void 0 ? void 0 : _c.children[_key2].children) || []).map((i) => {
                            const errorMessage = Object.values(i.constraints || {});
                            constraints.push(...errorMessage);
                        });
                        const errorMessage = Object.values(((_f = (_e = (_d = error === null || error === void 0 ? void 0 : error.extensions) === null || _d === void 0 ? void 0 : _d.invalidArgs) === null || _e === void 0 ? void 0 : _e[key]) === null || _f === void 0 ? void 0 : _f.children[_key2].constraints) || {});
                        constraints.push(...errorMessage);
                    });
                }
                Object.keys(((_j = (_h = (_g = error === null || error === void 0 ? void 0 : error.extensions) === null || _g === void 0 ? void 0 : _g.invalidArgs) === null || _h === void 0 ? void 0 : _h[key]) === null || _j === void 0 ? void 0 : _j.constraints) || []).forEach((_key) => {
                    var _a, _b;
                    constraints.push((_b = (_a = error === null || error === void 0 ? void 0 : error.extensions) === null || _a === void 0 ? void 0 : _a.invalidArgs) === null || _b === void 0 ? void 0 : _b[key].constraints[_key]);
                });
                extensions.errors.push({
                    field: (_l = (_k = error === null || error === void 0 ? void 0 : error.extensions) === null || _k === void 0 ? void 0 : _k.invalidArgs) === null || _l === void 0 ? void 0 : _l[key].property,
                    errors: constraints,
                });
            });
            const graphQLFormattedError = {
                message: 'VALIDATION_ERROR',
                extensions: extensions,
            };
            return graphQLFormattedError;
        }
        else {
            return error;
        }
    }
    _configSubscriptions() {
        return {
            'subscriptions-transport-ws': {
                connectionInitWaitTimeout: 5000,
                onConnect: async (connectionParams) => {
                    var _a;
                    const token = (_a = connectionParams === null || connectionParams === void 0 ? void 0 : connectionParams.Authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                    if (token) {
                        const jwtPayload = await this.authNService.verifyTokenAsync(token);
                        const user = await this.authZService.validateUser(jwtPayload);
                        if (!user) {
                            throw new common_1.UnauthorizedException('User not found');
                        }
                        return {
                            user,
                            headers: {
                                authorization: `Bearer ${token}`,
                            },
                        };
                    }
                    throw new common_1.UnauthorizedException('Token not found');
                },
            },
        };
    }
};
GraphQLConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        authn_service_1.AuthNService,
        authz_service_1.AuthZService])
], GraphQLConfigService);
exports.GraphQLConfigService = GraphQLConfigService;
//# sourceMappingURL=graphql-config.service.js.map