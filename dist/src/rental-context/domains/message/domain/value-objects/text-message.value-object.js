"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextMessageVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
class TextMessageVO extends value_object_base_1.ValueObject {
    static create(props) {
        return new TextMessageVO(props);
    }
    get text() {
        return this.props.text;
    }
    validate({ text }) {
        if (!guard_1.Guard.isPositiveNumber(text.length) || text.length > 2000) {
            throw new exceptions_1.ArgumentInvalidException('Message length must be more than 0 and less than 2000');
        }
    }
}
exports.TextMessageVO = TextMessageVO;
//# sourceMappingURL=text-message.value-object.js.map