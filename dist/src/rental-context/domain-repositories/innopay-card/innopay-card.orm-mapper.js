"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayCardOrmMapper = void 0;
const types_1 = require("../../domains/innopay-card/domain/types");
const innopay_users_orm_entity_1 = require("../../../infrastructure/database/entities/innopay-users.orm-entity");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const orm_mapper_base_1 = require("../../../libs/ddd/infrastructure/database/orm-mapper.base");
const exceptions_1 = require("../../../libs/exceptions");
const uuid_1 = require("uuid");
const pan_masked_value_object_1 = require("../../domains/innopay-card/domain/value-objects/pan-masked.value-object");
class InnopayCardOrmMapper extends orm_mapper_base_1.OrmMapper {
    async toOrmProps(entity, trxId) {
        var _a;
        const props = entity.getPropsCopy();
        const trx = trxId ? (_a = this.unitOfWork) === null || _a === void 0 ? void 0 : _a.getTrx(trxId) : undefined;
        let innopayUser = await innopay_users_orm_entity_1.InnopayUsersOrmEntity.query(trx)
            .findOne({ userId: props.userId.value, cnpUserId: props.cnpUserId })
            .select('id');
        if (!innopayUser) {
            innopayUser = await innopay_users_orm_entity_1.InnopayUsersOrmEntity.query(trx).insertAndFetch({
                id: (0, uuid_1.v4)(),
                cnpUserId: props.cnpUserId,
                userId: props.userId.value,
                isCrediting: props.appointmentType === types_1.InnopayAppointmentCardType.CREDITING,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        const ormProps = {
            cnpCardId: props.cnpCardId,
            panMasked: props.panMasked.value,
            cardHolder: props.cardHolder,
            cardType: props.cardType,
            innopayId: innopayUser.id,
            appointmentType: props.appointmentType,
        };
        return ormProps;
    }
    async toDomainProps(ormEntity, trxId) {
        var _a;
        const id = new uuid_value_object_1.UUID(ormEntity.id);
        const trx = trxId ? (_a = this.unitOfWork) === null || _a === void 0 ? void 0 : _a.getTrx(trxId) : undefined;
        const innopayUser = await innopay_users_orm_entity_1.InnopayUsersOrmEntity.query(trx)
            .findById(ormEntity.innopayId)
            .select('userId', 'cnpUserId');
        if (!innopayUser) {
            throw new exceptions_1.ArgumentInvalidException('Innopay user not exist');
        }
        const props = {
            cnpCardId: ormEntity.cnpCardId,
            panMasked: new pan_masked_value_object_1.PanMaskedVO(ormEntity.panMasked),
            cardHolder: ormEntity.cardHolder,
            cardType: ormEntity.cardType,
            cnpUserId: innopayUser.cnpUserId,
            userId: new uuid_value_object_1.UUID(innopayUser.userId),
            appointmentType: ormEntity.appointmentType,
        };
        return { id, props };
    }
}
exports.InnopayCardOrmMapper = InnopayCardOrmMapper;
//# sourceMappingURL=innopay-card.orm-mapper.js.map