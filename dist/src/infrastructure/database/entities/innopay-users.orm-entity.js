"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayUsersOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
const objection_1 = require("objection");
const innopay_card_orm_entity_1 = require("./innopay-card.orm-entity");
class InnopayUsersOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return InnopayUsersOrmEntity.fromJson(data);
    }
}
exports.InnopayUsersOrmEntity = InnopayUsersOrmEntity;
InnopayUsersOrmEntity.tableName = 'innopay_users';
InnopayUsersOrmEntity.relationMappings = () => {
    return {
        cards: {
            relation: objection_1.Model.HasManyRelation,
            modelClass: innopay_card_orm_entity_1.InnopayCardOrmEntity,
            join: {
                from: `${InnopayUsersOrmEntity.tableName}.id`,
                to: `${innopay_card_orm_entity_1.InnopayCardOrmEntity.tableName}.innopayId`,
            },
        },
    };
};
//# sourceMappingURL=innopay-users.orm-entity.js.map