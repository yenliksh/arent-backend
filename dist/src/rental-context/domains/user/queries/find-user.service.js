"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserService = void 0;
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let FindUserService = class FindUserService {
    async handle(userId) {
        const user = await user_orm_entity_1.UserOrmEntity.query().findById(userId);
        if (!user) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('User not found'));
        }
        return (0, oxide_ts_1.Ok)(user);
    }
};
FindUserService = __decorate([
    (0, common_1.Injectable)()
], FindUserService);
exports.FindUserService = FindUserService;
//# sourceMappingURL=find-user.service.js.map