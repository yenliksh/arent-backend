"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageOrmMapper = void 0;
const media_message_value_object_1 = require("../../domains/message/domain/value-objects/media-message.value-object");
const system_message_value_object_1 = require("../../domains/message/domain/value-objects/system-message.value-object");
const text_message_value_object_1 = require("../../domains/message/domain/value-objects/text-message.value-object");
const uuid_value_object_1 = require("../../../libs/ddd/domain/value-objects/uuid.value-object");
const orm_mapper_base_1 = require("../../../libs/ddd/infrastructure/database/orm-mapper.base");
const date_util_1 = require("../../../libs/utils/date-util");
class MessageOrmMapper extends orm_mapper_base_1.OrmMapper {
    async toOrmProps(entity) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const props = entity.getPropsCopy();
        const textProps = (_a = props.text) === null || _a === void 0 ? void 0 : _a.unpack();
        const mediaProps = (_b = props.media) === null || _b === void 0 ? void 0 : _b.unpack();
        const systemProps = (_c = props.system) === null || _c === void 0 ? void 0 : _c.unpack();
        const ormProps = {
            chatId: props.chatId.value,
            senderId: props.senderId.value,
            type: props.type,
            status: props.status,
            text: (_d = textProps === null || textProps === void 0 ? void 0 : textProps.text) !== null && _d !== void 0 ? _d : null,
            fileKey: (_e = mediaProps === null || mediaProps === void 0 ? void 0 : mediaProps.fileKey) !== null && _e !== void 0 ? _e : null,
            fileName: (_f = mediaProps === null || mediaProps === void 0 ? void 0 : mediaProps.fileName) !== null && _f !== void 0 ? _f : null,
            fileWeight: (_g = mediaProps === null || mediaProps === void 0 ? void 0 : mediaProps.fileWeight) !== null && _g !== void 0 ? _g : null,
            systemMessageType: (_h = systemProps === null || systemProps === void 0 ? void 0 : systemProps.type) !== null && _h !== void 0 ? _h : null,
            contractData: systemProps
                ? {
                    ...systemProps.contractData,
                    arrivalDate: (_j = systemProps.contractData.arrivalDate) === null || _j === void 0 ? void 0 : _j.toISOString(),
                    departureDate: (_k = systemProps.contractData.departureDate) === null || _k === void 0 ? void 0 : _k.toISOString(),
                    transactionsMeta: (_l = systemProps.contractData.transactionsMeta) === null || _l === void 0 ? void 0 : _l.map((meta) => ({
                        ...meta,
                        endDate: meta.endDate.toISOString(),
                        startDate: meta.startDate.toISOString(),
                        withdrawFundsDate: meta.withdrawFundsDate.toISOString(),
                    })),
                }
                : null,
        };
        return ormProps;
    }
    async toDomainProps(ormEntity) {
        var _a;
        const id = new uuid_value_object_1.UUID(ormEntity.id);
        const props = {
            chatId: new uuid_value_object_1.UUID(ormEntity.chatId),
            senderId: new uuid_value_object_1.UUID(ormEntity.senderId),
            type: ormEntity.type,
            status: ormEntity.status,
            text: ormEntity.text ? text_message_value_object_1.TextMessageVO.create({ text: ormEntity.text }) : undefined,
            media: ormEntity.fileKey && ormEntity.fileName && ormEntity.fileWeight
                ? media_message_value_object_1.MediaMessageVO.create({
                    fileKey: ormEntity.fileKey,
                    fileName: ormEntity.fileName,
                    fileWeight: ormEntity.fileWeight,
                })
                : undefined,
            system: ormEntity.systemMessageType && ormEntity.contractData
                ? system_message_value_object_1.SystemMessageVO.create({
                    type: ormEntity.systemMessageType,
                    contractData: {
                        ...ormEntity.contractData,
                        arrivalDate: ormEntity.contractData.arrivalDate
                            ? date_util_1.DateUtil.parseUTC(ormEntity.contractData.arrivalDate).toDate()
                            : undefined,
                        departureDate: ormEntity.contractData.departureDate
                            ? date_util_1.DateUtil.parseUTC(ormEntity.contractData.departureDate).toDate()
                            : undefined,
                        transactionsMeta: (_a = ormEntity.contractData.transactionsMeta) === null || _a === void 0 ? void 0 : _a.map((meta) => ({
                            ...meta,
                            endDate: new Date(meta.endDate),
                            startDate: new Date(meta.startDate),
                            withdrawFundsDate: new Date(meta.withdrawFundsDate),
                        })),
                    },
                })
                : undefined,
        };
        return { id, props };
    }
}
exports.MessageOrmMapper = MessageOrmMapper;
//# sourceMappingURL=message.orm-mapper.js.map