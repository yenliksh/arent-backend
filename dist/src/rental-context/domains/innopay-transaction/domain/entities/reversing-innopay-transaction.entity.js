"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReversingInnopayTransactionEntity = void 0;
const aggregate_root_base_1 = require("../../../../../libs/ddd/domain/base-classes/aggregate-root.base");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const reversing_innopay_transaction_errors_1 = require("../errors/reversing-innopay-transaction.errors");
class ReversingInnopayTransactionEntity extends aggregate_root_base_1.AggregateRoot {
    static create({ customerReference }) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            customerReference,
            isReversed: false,
        };
        const rentPeriodVersion = new ReversingInnopayTransactionEntity({ id, props });
        return rentPeriodVersion;
    }
    reverse() {
        this.props.isReversed = true;
        this.validate();
    }
    get id() {
        return this._id;
    }
    get customerReference() {
        return this.props.customerReference;
    }
    validate() {
        const { customerReference, isReversed } = this.props;
        const fields = [customerReference, isReversed];
        if (fields.some((f) => f == null)) {
            throw new reversing_innopay_transaction_errors_1.ReversingInnopayTransactionHasEmptyFieldsError('Reversing innopay transaction must to have complete all required fields');
        }
    }
}
exports.ReversingInnopayTransactionEntity = ReversingInnopayTransactionEntity;
//# sourceMappingURL=reversing-innopay-transaction.entity.js.map