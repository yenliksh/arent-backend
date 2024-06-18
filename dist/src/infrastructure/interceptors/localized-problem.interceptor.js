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
exports.LocalizedProblemInterceptor = void 0;
const localized_problem_base_1 = require("../../libs/ddd/interface-adapters/base-classes/localized-problem.base");
const localized_base_interface_1 = require("../../libs/ddd/interface-adapters/interfaces/localized.base.interface");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const nestjs_i18n_1 = require("nestjs-i18n");
const operators_1 = require("rxjs/operators");
let LocalizedProblemInterceptor = class LocalizedProblemInterceptor {
    constructor(i18n) {
        this.i18n = i18n;
    }
    intercept(context, next) {
        var _a, _b;
        if (context.getType() === 'graphql') {
            const gqlCtx = graphql_1.GqlExecutionContext.create(context).getContext();
            const lang = ((_b = (_a = gqlCtx === null || gqlCtx === void 0 ? void 0 : gqlCtx.req) === null || _a === void 0 ? void 0 : _a.raw) === null || _b === void 0 ? void 0 : _b.i18nLang) || localized_base_interface_1.Language.EN;
            return next.handle().pipe((0, operators_1.map)(async (v) => {
                if (v && typeof v === 'object' && 'problem' in v) {
                    const { problem } = v;
                    if (problem instanceof localized_problem_base_1.LocalizedProblem) {
                        await problem.useLang(lang, this.i18n);
                    }
                }
                return v;
            }));
        }
        return next.handle();
    }
};
LocalizedProblemInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_i18n_1.I18nService])
], LocalizedProblemInterceptor);
exports.LocalizedProblemInterceptor = LocalizedProblemInterceptor;
//# sourceMappingURL=localized-problem.interceptor.js.map