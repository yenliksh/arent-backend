"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodVO = void 0;
const enums_1 = require("../../infrastructure/enums");
const value_object_base_1 = require("../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../libs/ddd/domain/guard");
const exceptions_1 = require("../../libs/exceptions");
const class_validator_1 = require("class-validator");
class PaymentMethodVO extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get defaultType() {
        return this.props.defaultType;
    }
    get innopayCardId() {
        return this.props.innopayCardId;
    }
    validate({ defaultType, innopayCardId }) {
        if (!guard_1.Guard.isValidEnum(defaultType, enums_1.PaymentMethod)) {
            throw new exceptions_1.ArgumentInvalidException('Unexpected payment type');
        }
        if (!defaultType || !innopayCardId) {
            throw new exceptions_1.ArgumentInvalidException('Payment method must provide all fields');
        }
        if (!(0, class_validator_1.isUUID)(innopayCardId, '4')) {
            throw new exceptions_1.ArgumentInvalidException('Card id must be UUID v4');
        }
    }
}
exports.PaymentMethodVO = PaymentMethodVO;
//# sourceMappingURL=payment-method.value-object.js.map