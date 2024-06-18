"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTransactionEntity = void 0;
const cost_and_currency_value_object_1 = require("../../../../domain-value-objects/cost-and-currency.value-object");
const types_1 = require("../../../contract/base-classes/rental-manager/types");
const cost_rounds_util_1 = require("../../../contract/base-classes/rental-strategies/utils/cost-rounds.util");
const customer_reference_value_object_1 = require("../value-objects/customer-reference.value-object");
const aggregate_root_base_1 = require("../../../../../libs/ddd/domain/base-classes/aggregate-root.base");
const guard_1 = require("../../../../../libs/ddd/domain/guard");
const date_time_iso_tz_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/date-time-iso-tz.value-object");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const date_util_1 = require("../../../../../libs/utils/date-util");
const constants_1 = require("../../../../constants");
const payment_transaction_errors_1 = require("../errors/payment-transaction.errors");
const types_2 = require("../types");
const payment_invoice_status_value_object_1 = require("../value-objects/payment-invoice-status.value-object");
const payment_invoice_entity_1 = require("./payment-invoice.entity");
class PaymentTransactionEntity extends aggregate_root_base_1.AggregateRoot {
    get recipientId() {
        return this.props.recipientId;
    }
    get senderId() {
        return this.props.senderId;
    }
    static create({ contractId, totalAmountPayable, totalAmountToBeTransferred, totalRevenue, withdrawFundsDate, startDate, endDate, senderTaxRate, recipientTaxRate, rentDays, cost, taxAmount, isLastPayment, isRecurring, recipientId, senderId, rentPeriodStrategyType, }) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            contractId,
            totalAmountPayable,
            totalAmountToBeTransferred,
            totalRevenue,
            withdrawFundsDate,
            startDate,
            endDate,
            senderTaxRate,
            recipientTaxRate,
            rentDays,
            cost,
            taxAmount,
            isLastPayment,
            isRecurring,
            recipientId,
            senderId,
            invoices: [],
            status: types_2.PaymentTransactionStatus.CASH_IN_WAITING,
            isFailure: false,
            rentPeriodStrategyType,
        };
        const paymentTransaction = new PaymentTransactionEntity({ id, props });
        return paymentTransaction;
    }
    get isLastPayment() {
        return this.props.isLastPayment;
    }
    isCashInActive() {
        const { invoices } = this.props;
        const paymentHasActiveStatus = this.props.status === types_2.PaymentTransactionStatus.CASH_IN_WAITING;
        const successInvoices = invoices.filter((invoice) => invoice.status === types_2.PaymentInvoiceStatus.SUCCESS).length === 0;
        const earlyPaymentDate = this.props.withdrawFundsDate.getDate();
        earlyPaymentDate.setDate(earlyPaymentDate.getDate() - PaymentTransactionEntity.EARLY_PAY_DAYS);
        return paymentHasActiveStatus && successInvoices && earlyPaymentDate <= date_util_1.DateUtil.utcNow().toDate();
    }
    isCashOutActive() {
        const { invoices, isRecurring, startDate } = this.props;
        const paymentHasActiveStatus = this.props.status === types_2.PaymentTransactionStatus.CASH_OUT_WAITING;
        const successInvoices = invoices.filter((invoice) => invoice.status === types_2.PaymentInvoiceStatus.SUCCESS).length === 1;
        const paymentDate = startDate.getDate();
        if (!isRecurring) {
            paymentDate.setDate(paymentDate.getDate() + PaymentTransactionEntity.CASH_OUT_AFTER_ARRIVAL_DAYS);
        }
        return paymentHasActiveStatus && successInvoices && paymentDate <= date_util_1.DateUtil.utcNow().toDate();
    }
    isReadyToSelfPayNow(tenantId) {
        return this.props.senderId.equals(tenantId) && this.isCashInActive();
    }
    isReadyToFirstContractPay() {
        return !this.props.isRecurring && this.isCashInActive();
    }
    cashInSuccess(cardMeta, customerReference) {
        this.addSuccessInvoice(types_2.PaymentInvoiceType.WITHDRAW, cardMeta, customerReference);
        this.props.status = types_2.PaymentTransactionStatus.CASH_OUT_WAITING;
        this.validate();
    }
    cashOutSuccess(cardMeta, customerReference) {
        this.addSuccessInvoice(types_2.PaymentInvoiceType.RECEIVING, cardMeta, customerReference);
        this.props.status = types_2.PaymentTransactionStatus.COMPLETED;
        this.validate();
    }
    failure(action, cardMeta, customerReference, error) {
        this.props.isFailure = true;
        this.addFailureInvoice(action, cardMeta, customerReference, error);
        this.validate();
    }
    cancel() {
        this.props.status = types_2.PaymentTransactionStatus.CANCELED;
        this.validate();
    }
    addSuccessInvoice(type, cardMeta, customerReference) {
        const refersToUserId = type === types_2.PaymentInvoiceType.RECEIVING ? this.props.recipientId : this.props.senderId;
        this.props.invoices.push(payment_invoice_entity_1.PaymentInvoiceEntity.create({
            date: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(),
            paymentTransactionId: this._id,
            status: payment_invoice_status_value_object_1.PaymentInvoiceStatusVO.create(types_2.PaymentInvoiceStatus.SUCCESS),
            customerReference: new customer_reference_value_object_1.CustomerReferenceVO(customerReference),
            refersToUserId,
            cardMeta,
            type,
        }));
    }
    addFailureInvoice(type, cardMeta, customerReference, error) {
        const refersToUserId = type === types_2.PaymentInvoiceType.WITHDRAW ? this.props.senderId : this.props.recipientId;
        this.props.invoices.push(payment_invoice_entity_1.PaymentInvoiceEntity.create({
            date: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(),
            paymentTransactionId: this._id,
            status: payment_invoice_status_value_object_1.PaymentInvoiceStatusVO.create(types_2.PaymentInvoiceStatus.FAILURE),
            customerReference: new customer_reference_value_object_1.CustomerReferenceVO(customerReference),
            refersToUserId,
            type,
            error,
            cardMeta,
        }));
    }
    get id() {
        return this._id;
    }
    get totalAmountPayable() {
        return this.props.totalAmountPayable.cost;
    }
    get totalAmountPayableCurrency() {
        return this.props.totalAmountPayable.currency;
    }
    get costPayable() {
        return this.props.cost.cost;
    }
    get costPayableCurrency() {
        return this.props.cost.currency;
    }
    get rentDays() {
        return this.props.rentDays;
    }
    get cost() {
        return this.props.cost;
    }
    get status() {
        return this.props.status;
    }
    get startDate() {
        return this.props.startDate;
    }
    get endDate() {
        return this.props.endDate;
    }
    get withdrawFundsDate() {
        return this.props.withdrawFundsDate.value;
    }
    get taxAmount() {
        return this.props.taxAmount.cost;
    }
    get totalRevenue() {
        return this.props.totalRevenue.cost;
    }
    get totalAmountToBeTransferred() {
        return this.props.totalAmountToBeTransferred.cost;
    }
    get contractId() {
        return this.props.contractId;
    }
    get senderCardOrFail() {
        if (!this.props.senderCard) {
            throw new exceptions_1.ArgumentInvalidException('Sender card required');
        }
        return this.props.senderCard;
    }
    get recipientCardOrFail() {
        if (!this.props.recipientCard) {
            throw new exceptions_1.ArgumentInvalidException('Recipient card required');
        }
        return this.props.recipientCard;
    }
    get isRecurring() {
        return this.props.isRecurring;
    }
    get metaInfo() {
        return {
            id: this.id.value,
            status: this.status,
            startDate: date_util_1.DateUtil.parseUTC(this.startDate.value).toDate(),
            endDate: date_util_1.DateUtil.parseUTC(this.endDate.value).toDate(),
            withdrawFundsDate: date_util_1.DateUtil.parseUTC(this.withdrawFundsDate).toDate(),
        };
    }
    setCheckOutDate(newCheckOutDate) {
        if (this.props.rentPeriodStrategyType === types_1.RentPeriodStrategyType.SHORT_TERM_RENT) {
            throw new exceptions_1.ArgumentInvalidException('Checkout date can be applied only for middle term rent and long term rent');
        }
        if (date_util_1.DateUtil.parseUTC(this.props.startDate.value).isAfter(newCheckOutDate)) {
            throw new exceptions_1.ArgumentInvalidException('Start date cannot be greater than end date');
        }
        if (date_util_1.DateUtil.parseUTC(this.props.withdrawFundsDate.value).isAfter(newCheckOutDate)) {
            throw new exceptions_1.ArgumentInvalidException('Withdraw date cannot be greater than end date');
        }
        const newRentDays = date_util_1.DateUtil.getDiffDays(this.props.startDate.value, newCheckOutDate);
        let cost = this.props.cost.cost;
        if (this.props.rentPeriodStrategyType === types_1.RentPeriodStrategyType.LONG_TERM_RENT) {
            const oldRentDays = date_util_1.DateUtil.getDiffDays(this.props.startDate.value, this.props.endDate.value);
            const costPerDay = cost / oldRentDays;
            cost = costPerDay;
        }
        const senderTaxAmount = newRentDays * cost * this.props.senderTaxRate.value;
        const recomputedTotalAmountPayable = newRentDays * cost + senderTaxAmount;
        const recomputedTotalAmountToBeTransferred = (newRentDays * cost * (1 - this.props.recipientTaxRate.value)) / (1 - constants_1.INNOPAY_CASH_OUT_TAX_RATE);
        const recomputedTotalRevenue = recomputedTotalAmountPayable -
            recomputedTotalAmountToBeTransferred -
            recomputedTotalAmountPayable * constants_1.INNOPAY_CASH_IN_TAX_RATE;
        this.props.totalAmountPayable = cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: (0, cost_rounds_util_1.costCeil)(recomputedTotalAmountPayable) });
        this.props.totalAmountToBeTransferred = cost_and_currency_value_object_1.CostAndCurrencyVO.create({
            cost: (0, cost_rounds_util_1.costCeil)(recomputedTotalAmountToBeTransferred),
        });
        this.props.totalRevenue = cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: (0, cost_rounds_util_1.costFloor)(recomputedTotalRevenue) });
        this.props.taxAmount = cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: (0, cost_rounds_util_1.costCeil)(senderTaxAmount) });
        this.props.endDate = new date_time_iso_tz_value_object_1.DateTimeISOTZVO(newCheckOutDate);
        this.props.rentDays = newRentDays;
        this.props.isLastPayment = true;
        return this;
    }
    validate() {
        const { contractId, withdrawFundsDate, totalAmountPayable, startDate, endDate, senderTaxRate, recipientTaxRate, rentDays, cost, taxAmount, status, isRecurring, rentPeriodStrategyType, } = this.props;
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
            status,
            isRecurring,
            rentPeriodStrategyType,
        ];
        if (fields.some((f) => f == null)) {
            throw new payment_transaction_errors_1.PaymentTransactionHasEmptyFieldsError('Contract transaction must to have complete all required fields');
        }
        if (!guard_1.Guard.isPositiveNumber(rentDays)) {
            throw new exceptions_1.ArgumentInvalidException('Rented days must be positive number');
        }
    }
}
exports.PaymentTransactionEntity = PaymentTransactionEntity;
PaymentTransactionEntity.EARLY_PAY_DAYS = 7;
PaymentTransactionEntity.CASH_OUT_AFTER_ARRIVAL_DAYS = 1;
//# sourceMappingURL=payment-transaction.entity.js.map