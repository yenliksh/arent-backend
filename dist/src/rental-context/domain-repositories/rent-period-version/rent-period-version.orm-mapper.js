"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentPeriodVersionOrmMapper = void 0;
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const orm_mapper_base_1 = require("../../../libs/ddd/infrastructure/database/orm-mapper.base");
class RentPeriodVersionOrmMapper extends orm_mapper_base_1.OrmMapper {
    async toOrmProps(entity) {
        const { version, shortTermRentMonth, middleTermRentMonth, longTermRentMonth } = entity.getPropsCopy();
        const ormProps = {
            version,
            shortTermRentMonth,
            middleTermRentMonth,
            longTermRentMonth,
        };
        return ormProps;
    }
    async toDomainProps(ormEntity) {
        const id = new uuid_value_object_1.UUID(ormEntity.id);
        const props = {
            version: ormEntity.version,
            shortTermRentMonth: ormEntity.shortTermRentMonth,
            middleTermRentMonth: ormEntity.middleTermRentMonth,
            longTermRentMonth: ormEntity.longTermRentMonth,
        };
        return { id, props };
    }
}
exports.RentPeriodVersionOrmMapper = RentPeriodVersionOrmMapper;
//# sourceMappingURL=rent-period-version.orm-mapper.js.map