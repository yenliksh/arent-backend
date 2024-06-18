"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const apartment_ad_complaint_orm_entity_1 = require("./apartment-ad-complaint.orm-entity");
const chat_member_orm_entity_1 = require("./chat-member.orm-entity");
const user_complaint_orm_entity_1 = require("./user-complaint.orm-entity");
class UserOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return UserOrmEntity.fromJson(data);
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                guarantors: { type: 'array' },
            },
        };
    }
}
exports.UserOrmEntity = UserOrmEntity;
UserOrmEntity.tableName = 'users';
UserOrmEntity.relationMappings = () => {
    return {
        chatMembers: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: chat_member_orm_entity_1.ChatMemberOrmEntity,
            join: {
                from: `${UserOrmEntity.tableName}.id`,
                to: `${chat_member_orm_entity_1.ChatMemberOrmEntity.tableName}.memberId`,
            },
        },
        apartmentAdComplaints: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: apartment_ad_complaint_orm_entity_1.ApartmentAdComplaintOrmEntity,
            join: {
                from: `${UserOrmEntity.tableName}.id`,
                to: `${apartment_ad_complaint_orm_entity_1.ApartmentAdComplaintOrmEntity.tableName}.userId`,
            },
        },
        sentComplaints: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: user_complaint_orm_entity_1.UserComplaintOrmEntity,
            join: {
                from: `${UserOrmEntity.tableName}.id`,
                to: `${user_complaint_orm_entity_1.UserComplaintOrmEntity.tableName}.senderId`,
            },
        },
        receivedComplaints: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: user_complaint_orm_entity_1.UserComplaintOrmEntity,
            join: {
                from: `${UserOrmEntity.tableName}.id`,
                to: `${user_complaint_orm_entity_1.UserComplaintOrmEntity.tableName}.landlordId`,
            },
        },
    };
};
//# sourceMappingURL=user.orm-entity.js.map