"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApartmentAdStatusVO = void 0;
const value_object_base_1 = require("../../../../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const exceptions_1 = require("../../../../../libs/exceptions");
const types_1 = require("../types");
class ApartmentAdStatusVO extends value_object_base_1.ValueObject {
    static create({ statusType, declineReason }) {
        return new ApartmentAdStatusVO({
            statusType,
            declineReason,
        });
    }
    get statusType() {
        return this.props.statusType;
    }
    get declineReason() {
        return this.props.declineReason;
    }
    get isPublished() {
        return this.statusType.includes(types_1.ApartmentAdStatusType.PUBLISHED);
    }
    get isProcessing() {
        return this.statusType.includes(types_1.ApartmentAdStatusType.PROCESSING);
    }
    get isPaused() {
        return this.statusType.includes(types_1.ApartmentAdStatusType.PAUSED);
    }
    get isDraft() {
        return this.statusType.includes(types_1.ApartmentAdStatusType.DRAFT);
    }
    validate(props) {
        const { statusType, declineReason } = props;
        if (statusType && statusType.some((i) => !guard_1.Guard.isValidEnum(i, types_1.ApartmentAdStatusType))) {
            throw new exceptions_1.ArgumentInvalidException('Unexpected rent period type');
        }
        if (declineReason && statusType.some((i) => i !== types_1.ApartmentAdStatusType.DRAFT)) {
            throw new exceptions_1.ArgumentInvalidException('Decline reason type must have a properly type');
        }
    }
}
exports.ApartmentAdStatusVO = ApartmentAdStatusVO;
//# sourceMappingURL=apartment-ad-status.value-object.js.map