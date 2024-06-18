"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporaryPaymentDataVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
class TemporaryPaymentDataVO extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get customerReference() {
        return this.props.customerReference;
    }
    get paymentUrl() {
        return this.props.paymentUrl.value;
    }
    get paymentUrlStartAt() {
        return this.props.paymentUrlStartAt.toISOString();
    }
    validate(props) {
        const { paymentUrlStartAt } = props;
        if (guard_1.Guard.isFutureDate(paymentUrlStartAt.toISOString())) {
            throw new exceptions_1.ArgumentInvalidException('paymentUrlStartAt must be more that start date');
        }
    }
}
exports.TemporaryPaymentDataVO = TemporaryPaymentDataVO;
//# sourceMappingURL=temporary-payment-data.value-object.js.map