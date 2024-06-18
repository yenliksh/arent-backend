"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlVO = void 0;
const value_object_base_1 = require("../base-classes/value-object.base");
const exceptions_1 = require("../../../exceptions");
const user_guard_1 = require("../../../../rental-context/domains/user/domain/user.guard");
class UrlVO extends value_object_base_1.ValueObject {
    constructor(value) {
        super({ value });
        this.props.value = UrlVO.format(value);
    }
    get value() {
        return this.props.value;
    }
    validate({ value }) {
        if (!user_guard_1.UserGuard.isUrl(value)) {
            throw new exceptions_1.ArgumentInvalidException('Url has incorrect format');
        }
    }
    static format(url) {
        return url.trim();
    }
}
exports.UrlVO = UrlVO;
//# sourceMappingURL=url.value-object.js.map