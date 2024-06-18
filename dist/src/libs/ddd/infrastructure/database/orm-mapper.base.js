"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrmMapper = void 0;
const date_value_object_1 = require("../../domain/value-objects/date.value-object");
const objection_1 = require("objection");
class OrmMapper {
    constructor(entityConstructor, unitOfWork) {
        this.entityConstructor = entityConstructor;
        this.unitOfWork = unitOfWork;
    }
    async toDomainEntity(ormEntity, trxId) {
        const { id, props } = await this.toDomainProps(ormEntity, trxId);
        const ormEntityBase = ormEntity;
        return new this.entityConstructor({
            id,
            props,
            createdAt: new date_value_object_1.DateVO(ormEntityBase.createdAt),
            updatedAt: new date_value_object_1.DateVO(ormEntityBase.updatedAt),
            deletedAt: ormEntityBase.deletedAt ? new date_value_object_1.DateVO(ormEntityBase.deletedAt) : null,
        });
    }
    async toOrmEntity(entity, trxId) {
        var _a;
        const props = await this.toOrmProps(entity, trxId);
        return objection_1.Model.fromJson({
            ...props,
            id: entity.id.value,
            createdAt: entity.createdAt.value,
            updatedAt: entity.updatedAt.value,
            deletedAt: ((_a = entity.deletedAt) === null || _a === void 0 ? void 0 : _a.value) || null,
        });
    }
}
exports.OrmMapper = OrmMapper;
//# sourceMappingURL=orm-mapper.base.js.map