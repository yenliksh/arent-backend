"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemMessageVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
const types_1 = require("../types");
class SystemMessageVO extends value_object_base_1.ValueObject {
    static create({ type, contractData }) {
        return new SystemMessageVO({ type, contractData });
    }
    get type() {
        return this.props.type;
    }
    get contractData() {
        return this.props.contractData;
    }
    validate({ type }) {
        if (type && !guard_1.Guard.isValidEnum(type, types_1.SystemMessageType)) {
            throw new exceptions_1.ArgumentInvalidException('Unexpected system message type');
        }
    }
}
exports.SystemMessageVO = SystemMessageVO;
//# sourceMappingURL=system-message.value-object.js.map