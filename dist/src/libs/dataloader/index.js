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
exports.Loader = exports.DataLoaderInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const NEST_LOADER_CONTEXT_KEY = 'NEST_LOADER_CONTEXT_KEY';
let DataLoaderInterceptor = class DataLoaderInterceptor {
    constructor(moduleRef) {
        this.moduleRef = moduleRef;
    }
    intercept(context, next) {
        const graphqlExecutionContext = graphql_1.GqlExecutionContext.create(context);
        const ctx = graphqlExecutionContext.getContext();
        if (ctx[NEST_LOADER_CONTEXT_KEY] === undefined) {
            ctx[NEST_LOADER_CONTEXT_KEY] = {
                contextId: core_1.ContextIdFactory.create(),
                getLoader: (type) => {
                    if (ctx[type] === undefined) {
                        try {
                            ctx[type] = this.moduleRef
                                .get(type, {
                                strict: false,
                            })
                                .generateDataLoader();
                            return ctx[type];
                        }
                        catch (e) {
                            throw new common_1.InternalServerErrorException(`The loader ${type} is not provided` + e);
                        }
                    }
                    return ctx[type];
                },
            };
        }
        return next.handle();
    }
};
DataLoaderInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.ModuleRef])
], DataLoaderInterceptor);
exports.DataLoaderInterceptor = DataLoaderInterceptor;
exports.Loader = (0, common_1.createParamDecorator)(async (data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context).getContext();
    if (ctx[NEST_LOADER_CONTEXT_KEY] === undefined) {
        throw new common_1.InternalServerErrorException(`
              You should provide interceptor ${DataLoaderInterceptor.name} globally with ${core_1.APP_INTERCEPTOR}
            `);
    }
    return await ctx[NEST_LOADER_CONTEXT_KEY].getLoader(data);
});
//# sourceMappingURL=index.js.map