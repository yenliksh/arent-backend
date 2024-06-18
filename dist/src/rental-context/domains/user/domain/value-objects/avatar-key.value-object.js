"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarKeyVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
class AvatarKeyVO extends value_object_base_1.ValueObject {
    constructor(value) {
        super({ value });
        this.props.value = AvatarKeyVO.format(value);
    }
    get value() {
        return this.props.value;
    }
    validate({ value }) {
        if (guard_1.Guard.isEmpty(value)) {
            throw new Error('Provided value is empty');
        }
    }
    static format(avatarKey) {
        return avatarKey.trim();
    }
}
exports.AvatarKeyVO = AvatarKeyVO;
//# sourceMappingURL=avatar-key.value-object.js.map