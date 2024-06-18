"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTermRentLockedDateOrmEntityLoader = void 0;
const short_term_rent_locked_dates_orm_entity_1 = require("../database/entities/short-term-rent-locked-dates.orm-entity");
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
let ShortTermRentLockedDateOrmEntityLoader = class ShortTermRentLockedDateOrmEntityLoader {
    generateDataLoader() {
        return new DataLoader(async (shortTermRentIds) => {
            const lockedDates = await short_term_rent_locked_dates_orm_entity_1.ShortTermRentLockedDateOrmEntity.query().whereIn('shortTermRentId', shortTermRentIds);
            return shortTermRentIds.map((shortTermRentId) => {
                return lockedDates.filter((i) => i.shortTermRentId === shortTermRentId);
            });
        });
    }
};
ShortTermRentLockedDateOrmEntityLoader = __decorate([
    (0, common_1.Injectable)()
], ShortTermRentLockedDateOrmEntityLoader);
exports.ShortTermRentLockedDateOrmEntityLoader = ShortTermRentLockedDateOrmEntityLoader;
//# sourceMappingURL=short-term-rent-locked-date.dataloader.js.map