"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdComplaintVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
const types_1 = require("../types");
class AdComplaintVO extends value_object_base_1.ValueObject {
    static create(type, reason) {
        return new AdComplaintVO({ type, reason });
    }
    validate({ type, reason }) {
        for (const t of type) {
            if (!guard_1.Guard.isValidEnum(t, types_1.AdComplaintType)) {
                throw new exceptions_1.ArgumentInvalidException('Unexpected cause of complaint type');
            }
        }
        if (type.includes(types_1.AdComplaintType.OTHER) && !reason) {
            throw new exceptions_1.ArgumentInvalidException('CauseOfComplaint.OTHER must contain text');
        }
        if (!type.includes(types_1.AdComplaintType.OTHER) && reason) {
            throw new exceptions_1.ArgumentInvalidException('Text must contain only in CauseOfComplaint.OTHER');
        }
    }
}
exports.AdComplaintVO = AdComplaintVO;
//# sourceMappingURL=ad-complaint.value-object.js.map