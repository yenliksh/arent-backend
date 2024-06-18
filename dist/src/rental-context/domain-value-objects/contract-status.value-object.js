"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractStatusVO = void 0;
const enums_1 = require("../../infrastructure/enums");
const value_object_base_1 = require("../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../libs/ddd/domain/guard");
const exceptions_1 = require("../../libs/exceptions");
class ContractStatusVO extends value_object_base_1.ValueObject {
    static create(type) {
        return new ContractStatusVO({ value: type });
    }
    get value() {
        return this.props.value;
    }
    validate({ value }) {
        if (value && !guard_1.Guard.isValidEnum(value, enums_1.ContractStatus)) {
            throw new exceptions_1.ArgumentInvalidException('Unexpected contract type');
        }
    }
}
exports.ContractStatusVO = ContractStatusVO;
//# sourceMappingURL=contract-status.value-object.js.map