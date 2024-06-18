"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitOfWorkModule = void 0;
const common_1 = require("@nestjs/common");
const unit_of_work_1 = require("./unit-of-work");
const unitOfWorkSingleton = new unit_of_work_1.UnitOfWork();
const unitOfWorkSingletonProvider = {
    provide: unit_of_work_1.UnitOfWork,
    useFactory: () => unitOfWorkSingleton,
};
let UnitOfWorkModule = class UnitOfWorkModule {
};
UnitOfWorkModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [],
        providers: [unitOfWorkSingletonProvider],
        exports: [unit_of_work_1.UnitOfWork],
    })
], UnitOfWorkModule);
exports.UnitOfWorkModule = UnitOfWorkModule;
//# sourceMappingURL=unit-of-work.module.js.map