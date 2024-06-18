"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTermRentLockedDateOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const short_term_rent_orm_entity_1 = require("./short-term-rent.orm-entity");
class ShortTermRentLockedDateOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return ShortTermRentLockedDateOrmEntity.fromJson(data);
    }
}
exports.ShortTermRentLockedDateOrmEntity = ShortTermRentLockedDateOrmEntity;
ShortTermRentLockedDateOrmEntity.tableName = 'short_term_rent_locked_dates';
ShortTermRentLockedDateOrmEntity.relationMappings = () => {
    return {
        shortTermRent: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: short_term_rent_orm_entity_1.ShortTermRentOrmEntity,
            join: {
                from: `${ShortTermRentLockedDateOrmEntity.tableName}.shortTermRentId`,
                to: `${short_term_rent_orm_entity_1.ShortTermRentOrmEntity.tableName}.id`,
            },
        },
    };
};
//# sourceMappingURL=short-term-rent-locked-dates.orm-entity.js.map