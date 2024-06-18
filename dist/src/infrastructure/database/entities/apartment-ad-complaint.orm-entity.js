"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdComplaintOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const apartment_ad_orm_entity_1 = require("./apartment-ad.orm-entity");
const user_orm_entity_1 = require("./user.orm-entity");
class ApartmentAdComplaintOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return ApartmentAdComplaintOrmEntity.fromJson(data);
    }
}
exports.ApartmentAdComplaintOrmEntity = ApartmentAdComplaintOrmEntity;
ApartmentAdComplaintOrmEntity.tableName = 'apartment_ad_complaints';
ApartmentAdComplaintOrmEntity.relationMappings = () => {
    return {
        user: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: user_orm_entity_1.UserOrmEntity,
            join: {
                from: `${ApartmentAdComplaintOrmEntity.tableName}.userId`,
                to: `${user_orm_entity_1.UserOrmEntity.tableName}.id`,
            },
        },
        apartmentAd: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: apartment_ad_orm_entity_1.ApartmentAdOrmEntity,
            join: {
                from: `${ApartmentAdComplaintOrmEntity.tableName}.apartmentAdId`,
                to: `${apartment_ad_orm_entity_1.ApartmentAdOrmEntity.tableName}.id`,
            },
        },
    };
};
//# sourceMappingURL=apartment-ad-complaint.orm-entity.js.map