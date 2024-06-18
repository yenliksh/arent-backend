"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortTermRentOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const apartment_ad_orm_entity_1 = require("./apartment-ad.orm-entity");
const short_term_rent_locked_dates_orm_entity_1 = require("./short-term-rent-locked-dates.orm-entity");
class ShortTermRentOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return ShortTermRentOrmEntity.fromJson(data);
    }
}
exports.ShortTermRentOrmEntity = ShortTermRentOrmEntity;
ShortTermRentOrmEntity.tableName = 'short_term_rents';
ShortTermRentOrmEntity.relationMappings = () => {
    return {
        apartmentAd: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: apartment_ad_orm_entity_1.ApartmentAdOrmEntity,
            join: {
                from: `${ShortTermRentOrmEntity.tableName}.apartmentAdId`,
                to: `${apartment_ad_orm_entity_1.ApartmentAdOrmEntity.tableName}.id`,
            },
        },
        lockedDates: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: short_term_rent_locked_dates_orm_entity_1.ShortTermRentLockedDateOrmEntity,
            join: {
                from: `${ShortTermRentOrmEntity.tableName}.id`,
                to: `${short_term_rent_locked_dates_orm_entity_1.ShortTermRentLockedDateOrmEntity.tableName}.shortTermRentId`,
            },
        },
    };
};
//# sourceMappingURL=short-term-rent.orm-entity.js.map