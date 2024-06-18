"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentPeriodVersionOrmEntity = void 0;
const objection_entity_base_1 = require("../../../libs/ddd/infrastructure/database/objection.entity.base");
class RentPeriodVersionOrmEntity extends objection_entity_base_1.ObjectionEntityBase {
    static create(data) {
        return RentPeriodVersionOrmEntity.fromJson(data);
    }
}
exports.RentPeriodVersionOrmEntity = RentPeriodVersionOrmEntity;
RentPeriodVersionOrmEntity.tableName = 'rent_period_versions';
//# sourceMappingURL=rent-period-version.orm-entity.js.map