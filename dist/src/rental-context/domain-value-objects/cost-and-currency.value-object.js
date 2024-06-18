"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostAndCurrencyVO = void 0;
const value_object_base_1 = require("../../libs/ddd/domain/base-classes/value-object.base");
const guard_1 = require("../../libs/ddd/domain/guard");
const exceptions_1 = require("../../libs/exceptions");
const types_1 = require("../domains/apartment-ad/domain/types");
class CostAndCurrencyVO extends value_object_base_1.ValueObject {
    get cost() {
        return this.props.cost;
    }
    get currency() {
        return this.props.currency;
    }
    static create({ cost, currency: defaultCurrency = types_1.CurrencyType.KZT, }) {
        return new CostAndCurrencyVO({ cost: Math.round(cost), currency: defaultCurrency });
    }
    validate(props) {
        if (!guard_1.Guard.isValidEnum(props.currency, types_1.CurrencyType)) {
            throw new exceptions_1.ArgumentInvalidException('Currency is not valid');
        }
        if (guard_1.Guard.isNegative(props.cost)) {
            throw new exceptions_1.ArgumentInvalidException('Cost is negative');
        }
    }
}
exports.CostAndCurrencyVO = CostAndCurrencyVO;
//# sourceMappingURL=cost-and-currency.value-object.js.map