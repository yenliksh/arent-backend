"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalCapacityVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
const types_1 = require("../types");
class LegalCapacityVO extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create({ type, tinBin, companyName, address }) {
        return new LegalCapacityVO({
            type,
            tinBin,
            companyName,
            address,
        });
    }
    validate(props) {
        const { type, tinBin, companyName, address } = props;
        if (!guard_1.Guard.isValidEnum(type, types_1.LegalCapacityType)) {
            throw new exceptions_1.ArgumentInvalidException('Unexpected rent legal capacity type');
        }
        if (type === types_1.LegalCapacityType.LEGAL_ENTITY && (!tinBin || !companyName || !address)) {
            throw new exceptions_1.ArgumentInvalidException('Legal capacity must have all required fields');
        }
    }
}
exports.LegalCapacityVO = LegalCapacityVO;
//# sourceMappingURL=legal-capacity.value-object.js.map