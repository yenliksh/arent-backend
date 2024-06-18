"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentInvoiceEntity = void 0;
const entity_base_1 = require("../../../../../libs/ddd/domain/base-classes/entity.base");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const payment_transaction_errors_1 = require("../errors/payment-transaction.errors");
const types_1 = require("../types");
class PaymentInvoiceEntity extends entity_base_1.Entity {
    static create({ paymentTransactionId, date, status, refersToUserId, type, error, cardMeta, customerReference, }) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            paymentTransactionId,
            date,
            status,
            refersToUserId,
            type,
            error,
            cardMeta,
            customerReference,
        };
        const contractOffer = new PaymentInvoiceEntity({ id, props });
        return contractOffer;
    }
    get id() {
        return this._id;
    }
    get status() {
        return this.props.status.value;
    }
    validate() {
        const { paymentTransactionId, date, status, refersToUserId, type, error } = this.props;
        const fields = [paymentTransactionId, date, status, refersToUserId, type];
        if (fields.some((f) => f == null)) {
            throw new payment_transaction_errors_1.PaymentTransactionHasEmptyFieldsError('Contract transaction invoice must to have complete all required fields');
        }
        if (status.value === types_1.PaymentInvoiceStatus.SUCCESS && error) {
            throw new exceptions_1.ArgumentInvalidException('Success invoice cannot have error message');
        }
    }
}
exports.PaymentInvoiceEntity = PaymentInvoiceEntity;
//# sourceMappingURL=payment-invoice.entity.js.map