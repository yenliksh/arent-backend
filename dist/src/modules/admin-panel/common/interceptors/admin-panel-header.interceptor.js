"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPanelHeaderInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let AdminPanelHeaderInterceptor = class AdminPanelHeaderInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.tap)((data) => {
            const res = context.switchToHttp().getResponse();
            if (Array.isArray(data)) {
                res.header('Access-Control-Expose-Headers', 'X-Total-Count');
                res.header('X-Total-Count', `${data.length}`);
            }
            else {
                res.header('Access-Control-Expose-Headers', 'X-Total-Count');
                res.header('X-Total-Count', `0`);
            }
        }));
    }
};
AdminPanelHeaderInterceptor = __decorate([
    (0, common_1.Injectable)()
], AdminPanelHeaderInterceptor);
exports.AdminPanelHeaderInterceptor = AdminPanelHeaderInterceptor;
//# sourceMappingURL=admin-panel-header.interceptor.js.map