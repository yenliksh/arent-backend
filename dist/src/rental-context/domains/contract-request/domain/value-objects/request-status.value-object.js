"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRequestStatusVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
const types_1 = require("../types");
class ContractRequestStatusVO extends value_object_base_1.ValueObject {
    static create(type) {
        return new ContractRequestStatusVO({ value: type });
    }
    get value() {
        return this.props.value;
    }
    validate({ value }) {
        if (value && !guard_1.Guard.isValidEnum(value, types_1.ContractRequestStatus)) {
            throw new exceptions_1.ArgumentInvalidException('Unexpected request status type');
        }
    }
}
exports.ContractRequestStatusVO = ContractRequestStatusVO;
//# sourceMappingURL=request-status.value-object.js.map