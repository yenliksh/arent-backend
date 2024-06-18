"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdIdentificatorOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
class ApartmentAdIdentificatorOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return ApartmentAdIdentificatorOrmEntity.fromJson(data);
    }
}
exports.ApartmentAdIdentificatorOrmEntity = ApartmentAdIdentificatorOrmEntity;
ApartmentAdIdentificatorOrmEntity.tableName = 'apartment_identificator';
//# sourceMappingURL=apartment-ad-identificator.orm-entity.js.map