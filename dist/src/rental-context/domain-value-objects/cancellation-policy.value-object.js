"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancellationPolicyVO = void 0;
const enums_1 = require("../../infrastructure/enums");
const value_object_base_1 = require("../../libs/ddd/domain/base-classes/value-object.base");
const exceptions_1 = require("../../libs/exceptions");
class CancellationPolicyVO extends value_object_base_1.ValueObject {
    static create(apartmentRentPeriodType, { shortTermCancellationPolicy, longTermCancellationPolicy }) {
        const props = {
            shortTermCancellationPolicy: apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM ? shortTermCancellationPolicy : undefined,
            longTermCancellationPolicy: apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.LONG_TERM ? longTermCancellationPolicy : undefined,
        };
        return new CancellationPolicyVO(props);
    }
    get shortTermCancellationPolicy() {
        return this.props.shortTermCancellationPolicy;
    }
    get longTermCancellationPolicy() {
        return this.props.longTermCancellationPolicy;
    }
    validate(props) {
        const { shortTermCancellationPolicy, longTermCancellationPolicy } = props;
        if (shortTermCancellationPolicy && longTermCancellationPolicy) {
            throw new exceptions_1.ArgumentInvalidException('Cancellation policy required only for one rent term');
        }
        if (!shortTermCancellationPolicy && !longTermCancellationPolicy) {
            throw new exceptions_1.ArgumentInvalidException('Cancellation policy required');
        }
    }
}
exports.CancellationPolicyVO = CancellationPolicyVO;
//# sourceMappingURL=cancellation-policy.value-object.js.map