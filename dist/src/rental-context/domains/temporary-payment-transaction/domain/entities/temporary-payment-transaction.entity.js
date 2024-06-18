"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporaryPaymentTransactionEntity = void 0;
const aggregate_root_base_1 = require("../../../../../libs/ddd/domain/base-classes/aggregate-root.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const temporary_payment_transaction_errors_1 = require("../errors/temporary-payment-transaction.errors");
class TemporaryPaymentTransactionEntity extends aggregate_root_base_1.AggregateRoot {
    static create({ contractId, isFirst, cost, endDate, recipientTaxRate, rentDays, senderTaxRate, startDate, taxAmount, totalAmountPayable, totalAmountToBeTransferred, totalRevenue, withdrawFundsDate, }) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            contractId,
            isFirst,
            cost,
            endDate,
            recipientTaxRate,
            rentDays,
            senderTaxRate,
            startDate,
            taxAmount,
            totalAmountPayable,
            totalAmountToBeTransferred,
            totalRevenue,
            withdrawFundsDate,
        };
        const temporaryTransaction = new TemporaryPaymentTransactionEntity({ id, props });
        return temporaryTransaction;
    }
    get isFirst() {
        return this.props.isFirst;
    }
    get totalAmountPayable() {
        return this.props.totalAmountPayable.cost;
    }
    get withdrawFundsDate() {
        return this.props.withdrawFundsDate.value;
    }
    validate() {
        const { contractId, isFirst, withdrawFundsDate, totalAmountPayable, startDate, endDate, senderTaxRate, recipientTaxRate, rentDays, cost, taxAmount, totalAmountToBeTransferred, totalRevenue, } = this.props;
        const fields = [
            contractId,
            withdrawFundsDate,
            totalAmountPayable,
            startDate,
            endDate,
            senderTaxRate,
            recipientTaxRate,
            rentDays,
            cost,
            taxAmount,
            isFirst,
            totalAmountToBeTransferred,
            totalRevenue,
        ];
        if (fields.some((f) => f == null)) {
            throw new temporary_payment_transaction_errors_1.TemporaryPaymentTransactionHasEmptyFieldsError('Temporary transaction must to have complete all required fields');
        }
        if (!guard_1.Guard.isPositiveNumber(rentDays)) {
            throw new exceptions_1.ArgumentInvalidException('Rented days must be positive number');
        }
    }
}
exports.TemporaryPaymentTransactionEntity = TemporaryPaymentTransactionEntity;
//# sourceMappingURL=temporary-payment-transaction.entity.js.map