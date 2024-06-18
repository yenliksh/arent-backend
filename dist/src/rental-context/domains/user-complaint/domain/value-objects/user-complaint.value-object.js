"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserComplaintVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
const types_1 = require("../types");
class UserComplaintVO extends value_object_base_1.ValueObject {
    static create(type, reason) {
        return new UserComplaintVO({ type, reason });
    }
    validate({ type, reason }) {
        for (const t of type) {
            if (!guard_1.Guard.isValidEnum(t, types_1.UserComplaintType)) {
                throw new exceptions_1.ArgumentInvalidException('Unexpected cause of complaint type');
            }
        }
        if (type.includes(types_1.UserComplaintType.OTHER) && !reason) {
            throw new exceptions_1.ArgumentInvalidException('UserComplaintType.OTHER must contain text');
        }
        if (!type.includes(types_1.UserComplaintType.OTHER) && reason) {
            throw new exceptions_1.ArgumentInvalidException('Text must contain only in UserComplaintType.OTHER');
        }
    }
}
exports.UserComplaintVO = UserComplaintVO;
//# sourceMappingURL=user-complaint.value-object.js.map