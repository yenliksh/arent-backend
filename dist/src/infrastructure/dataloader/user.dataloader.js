"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOrmEntityLoader = void 0;
const user_orm_entity_1 = require("../database/entities/user.orm-entity");
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
let UserOrmEntityLoader = class UserOrmEntityLoader {
    generateDataLoader() {
        return new DataLoader(async (userIds) => {
            const users = await user_orm_entity_1.UserOrmEntity.query().findByIds(userIds);
            return userIds.map((id) => users.find((user) => user.id === id));
        });
    }
};
UserOrmEntityLoader = __decorate([
    (0, common_1.Injectable)()
], UserOrmEntityLoader);
exports.UserOrmEntityLoader = UserOrmEntityLoader;
//# sourceMappingURL=user.dataloader.js.map