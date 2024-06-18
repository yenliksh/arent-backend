"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LongTermRentOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const apartment_ad_orm_entity_1 = require("./apartment-ad.orm-entity");
class LongTermRentOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return LongTermRentOrmEntity.fromJson(data);
    }
}
exports.LongTermRentOrmEntity = LongTermRentOrmEntity;
LongTermRentOrmEntity.tableName = 'long_term_rents';
LongTermRentOrmEntity.relationMappings = () => {
    return {
        apartmentAd: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: apartment_ad_orm_entity_1.ApartmentAdOrmEntity,
            join: {
                from: `${LongTermRentOrmEntity.tableName}.apartmentAdId`,
                to: `${apartment_ad_orm_entity_1.ApartmentAdOrmEntity.tableName}.id`,
            },
        },
    };
};
//# sourceMappingURL=long-term-rent.orm-entity.js.map