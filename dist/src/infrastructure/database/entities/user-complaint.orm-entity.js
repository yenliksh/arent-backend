"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserComplaintOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const user_orm_entity_1 = require("./user.orm-entity");
class UserComplaintOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return UserComplaintOrmEntity.fromJson(data);
    }
}
exports.UserComplaintOrmEntity = UserComplaintOrmEntity;
UserComplaintOrmEntity.tableName = 'user_complaints';
UserComplaintOrmEntity.relationMappings = () => {
    return {
        sender: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: user_orm_entity_1.UserOrmEntity,
            join: {
                from: `${UserComplaintOrmEntity.tableName}.senderId`,
                to: `${user_orm_entity_1.UserOrmEntity.tableName}.id`,
            },
        },
        landlord: {
            relation: objection_1.Model.BelongsToOneRelation,
            modelClass: user_orm_entity_1.UserOrmEntity,
            join: {
                from: `${UserComplaintOrmEntity.tableName}.landlordId`,
                to: `${user_orm_entity_1.UserOrmEntity.tableName}.id`,
            },
        },
    };
};
//# sourceMappingURL=user-complaint.orm-entity.js.map