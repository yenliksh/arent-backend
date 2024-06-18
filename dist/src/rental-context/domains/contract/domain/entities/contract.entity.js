"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractEntity = void 0;
const apartment_rules_value_object_1 = require("../../../../domain-value-objects/apartment-rules.value-object");
const cancellation_policy_value_object_1 = require("../../../../domain-value-objects/cancellation-policy.value-object");
const cost_and_currency_value_object_1 = require("../../../../domain-value-objects/cost-and-currency.value-object");
const payment_method_value_object_1 = require("../../../../domain-value-objects/payment-method.value-object");
const tax_value_object_1 = require("../../../../domain-value-objects/tax.value-object");
const types_1 = require("../../../apartment-ad/domain/types");
const long_term_rent_landlord_cancelation_strategy_1 = require("../../base-classes/rental-cancelation-strategies/long-term-rent-cancelation-strategies/long-term-rent-landlord-cancelation.strategy");
const long_term_rent_tenant_cancelation_strategy_1 = require("../../base-classes/rental-cancelation-strategies/long-term-rent-cancelation-strategies/long-term-rent-tenant-cancelation.strategy");
const middle_term_rent_landlord_cancelation_strategy_1 = require("../../base-classes/rental-cancelation-strategies/middle-term-rent-cancelation-strategies/middle-term-rent-landlord-cancelation.strategy");
const middle_term_rent_tenant_cancelation_strategy_1 = require("../../base-classes/rental-cancelation-strategies/middle-term-rent-cancelation-strategies/middle-term-rent-tenant-cancelation.strategy");
const short_term_rent_landlord_cancelation_strategy_1 = require("../../base-classes/rental-cancelation-strategies/short-term-rent-cancelation-strategies/short-term-rent-landlord-cancelation.strategy");
const short_term_rent_tenant_cancelation_strategy_1 = require("../../base-classes/rental-cancelation-strategies/short-term-rent-cancelation-strategies/short-term-rent-tenant-cancelation.strategy");
const rental_date_guard_1 = require("../../base-classes/rental-guards/rental-date.guard");
const rental_manager_1 = require("../../base-classes/rental-manager/rental.manager");
const types_2 = require("../../base-classes/rental-manager/types");
const payment_transaction_entity_1 = require("../../../payment-transaction/domain/entities/payment-transaction.entity");
const temporary_payment_transaction_entity_1 = require("../../../temporary-payment-transaction/domain/entities/temporary-payment-transaction.entity");
const value_objects_1 = require("../../../user/domain/value-objects");
const enums_1 = require("../../../../../infrastructure/enums");
const aggregate_root_base_1 = require("../../../../../libs/ddd/domain/base-classes/aggregate-root.base");
const date_time_iso_tz_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/date-time-iso-tz.value-object");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const exceptions_1 = require("../../../../../libs/exceptions");
const illegal_operation_exception_1 = require("../../../../../libs/exceptions/illegal-operation.exception");
const date_util_1 = require("../../../../../libs/utils/date-util");
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const contract_status_value_object_1 = require("../../../../domain-value-objects/contract-status.value-object");
const contract_errors_1 = require("../errors/contract.errors");
const types_3 = require("../types");
const contract_details_value_object_1 = require("../value-objects/contract-details.value-object");
const temporary_payment_data_value_object_1 = require("../value-objects/temporary-payment-data.value-object");
const contract_cancelation_entity_1 = require("./contract-cancelation.entity");
class ContractEntity extends aggregate_root_base_1.AggregateRoot {
    static create({ apartmentAdId, detailsProps, tenantId, costAndCurrency, status, apartmentRentPeriodType, landlordId, contractRequestId, rentPeriodVersion, cancellationPolicyProps, tenantPaymentMethod, shortTermRentBookingType, shortTermRentPaymentType, baseContractApartmentAdData, isFined = false, guests, isTemporary, paymentData, }) {
        const id = uuid_value_object_1.UUID.generate();
        const props = {
            contractRequestId,
            apartmentAdId,
            details: new contract_details_value_object_1.ContractDetailsVO(detailsProps),
            costAndCurrency,
            status: contract_status_value_object_1.ContractStatusVO.create(status),
            tenantId,
            apartmentRentPeriodType,
            landlordId,
            rentPeriodVersion,
            cancellationPolicy: cancellation_policy_value_object_1.CancellationPolicyVO.create(apartmentRentPeriodType, cancellationPolicyProps),
            isPending: false,
            tenantPaymentMethod,
            shortTermRentBookingType,
            shortTermRentPaymentType,
            baseContractApartmentAdData,
            guests,
            isFined,
            isExistUnpaidTransactions: false,
            isTemporary: isTemporary !== null && isTemporary !== void 0 ? isTemporary : false,
            paymentData: paymentData !== null && paymentData !== void 0 ? paymentData : null,
        };
        const contract = new ContractEntity({ id, props });
        return contract;
    }
    setTenantPaymentMethod(cardId) {
        const isActive = this.isActive();
        if (!isActive) {
            throw new common_1.UnprocessableEntityException('Set tenant payment method available only for active contract');
        }
        this.props.tenantPaymentMethod = new payment_method_value_object_1.PaymentMethodVO({
            innopayCardId: cardId.value,
            defaultType: enums_1.PaymentMethod.INNOPAY,
        });
        this.validate();
    }
    setOffer({ allowedToHangingOut, allowedToSmoke, allowedWithChildren, allowedWithPets }) {
        const { status, shortTermRentBookingType } = this.props;
        if (status.value !== enums_1.ContractStatus.CREATED) {
            throw new exceptions_1.ArgumentInvalidException(`You can send offer if contract status = ${enums_1.ContractStatus.CREATED} only`);
        }
        if ((shortTermRentBookingType === null || shortTermRentBookingType === void 0 ? void 0 : shortTermRentBookingType.value) === enums_1.ShortTermRentBookingType.INSTANT) {
            throw new exceptions_1.ArgumentInvalidException('You can not set offer in instant booking contract');
        }
        this.props.details = new contract_details_value_object_1.ContractDetailsVO({
            arrivalDate: this.props.details.arrivalDate,
            departureDate: this.props.details.departureDate,
            rules: apartment_rules_value_object_1.ApartmentRulesVO.create({
                allowedToHangingOut,
                allowedToSmoke,
                allowedWithChildren,
                allowedWithPets,
            }),
        });
        this.props.status = contract_status_value_object_1.ContractStatusVO.create(enums_1.ContractStatus.OFFERING);
        this.validate();
    }
    instantBooking() {
        var _a;
        if (this.props.status.value !== enums_1.ContractStatus.CREATED ||
            ((_a = this.props.shortTermRentBookingType) === null || _a === void 0 ? void 0 : _a.value) !== enums_1.ShortTermRentBookingType.INSTANT) {
            throw new exceptions_1.ArgumentInvalidException(`You can instant booking if contract status = ${enums_1.ContractStatus.CREATED} and shortTermRentBookingType = ${enums_1.ShortTermRentBookingType.INSTANT} only`);
        }
        this.props.status = contract_status_value_object_1.ContractStatusVO.create(enums_1.ContractStatus.CONCLUDED);
        this.validate();
        return this.generateTransactions();
    }
    temporaryInstantBooking() {
        var _a;
        if (this.props.status.value !== enums_1.ContractStatus.CREATED ||
            ((_a = this.props.shortTermRentBookingType) === null || _a === void 0 ? void 0 : _a.value) !== enums_1.ShortTermRentBookingType.INSTANT) {
            throw new exceptions_1.ArgumentInvalidException(`You can instant booking if contract status = ${enums_1.ContractStatus.CREATED} and shortTermRentBookingType = ${enums_1.ShortTermRentBookingType.INSTANT} only`);
        }
        if (!this.props.isTemporary) {
            throw new exceptions_1.ArgumentInvalidException('You can instant temporary conclude only contracts with isTemporary = true');
        }
        this.props.status = contract_status_value_object_1.ContractStatusVO.create(enums_1.ContractStatus.CONCLUDED);
        this.validate();
        const paymentManager = rental_manager_1.PaymentManager.defineStrategy(this);
        const generatedTransactions = paymentManager.handle().data;
        return generatedTransactions.map((transaction, index) => temporary_payment_transaction_entity_1.TemporaryPaymentTransactionEntity.create({
            contractId: this._id,
            isFirst: !index,
            totalAmountPayable: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: transaction.totalAmountPayable }),
            totalAmountToBeTransferred: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: transaction.totalAmountToBeTransferred }),
            totalRevenue: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: transaction.totalRevenue }),
            withdrawFundsDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(transaction.withdrawFundsDate),
            startDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(transaction.startDate),
            endDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(transaction.endDate),
            senderTaxRate: new tax_value_object_1.TaxVO({ value: transaction.senderTaxRate }),
            recipientTaxRate: new tax_value_object_1.TaxVO({ value: transaction.recipientTaxRate }),
            rentDays: transaction.rentDays,
            cost: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: transaction.cost }),
            taxAmount: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: transaction.taxAmount }),
        }));
    }
    acceptOffer(cardId) {
        const { status, shortTermRentBookingType } = this.props;
        if (status.value !== enums_1.ContractStatus.OFFERING) {
            throw new exceptions_1.ArgumentInvalidException(`You can accept offer if contract status = ${enums_1.ContractStatus.OFFERING} only`);
        }
        if ((shortTermRentBookingType === null || shortTermRentBookingType === void 0 ? void 0 : shortTermRentBookingType.value) === enums_1.ShortTermRentBookingType.INSTANT) {
            throw new exceptions_1.ArgumentInvalidException('You can not set offer in instant booking contract');
        }
        this.props.tenantPaymentMethod = new payment_method_value_object_1.PaymentMethodVO({
            innopayCardId: cardId.value,
            defaultType: enums_1.PaymentMethod.INNOPAY,
        });
        this.props.status = contract_status_value_object_1.ContractStatusVO.create(enums_1.ContractStatus.CONCLUDED);
        this.validate();
        return this.generateTransactions();
    }
    acceptOfferDown() {
        if (this.props.status.value === enums_1.ContractStatus.OFFERING) {
            return;
        }
        if (this.props.status.value !== enums_1.ContractStatus.CONCLUDED) {
            throw new exceptions_1.ArgumentInvalidException(`You can down accept offer if contract status = ${enums_1.ContractStatus.CONCLUDED} only`);
        }
        this.props.tenantPaymentMethod = undefined;
        this.props.status = contract_status_value_object_1.ContractStatusVO.create(enums_1.ContractStatus.OFFERING);
    }
    temporaryConclude() {
        if (this.props.status.value !== enums_1.ContractStatus.OFFERING) {
            throw new exceptions_1.ArgumentInvalidException(`You can temporary conclude contract if status = ${enums_1.ContractStatus.OFFERING} only`);
        }
        this.props.status = contract_status_value_object_1.ContractStatusVO.create(enums_1.ContractStatus.CONCLUDED);
        this.props.isTemporary = true;
        this.validate();
        const paymentManager = rental_manager_1.PaymentManager.defineStrategy(this);
        const generatedTransactions = paymentManager.handle().data;
        return generatedTransactions.map((transaction, index) => temporary_payment_transaction_entity_1.TemporaryPaymentTransactionEntity.create({
            contractId: this._id,
            isFirst: !index,
            totalAmountPayable: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: transaction.totalAmountPayable }),
            totalAmountToBeTransferred: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: transaction.totalAmountToBeTransferred }),
            totalRevenue: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: transaction.totalRevenue }),
            withdrawFundsDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(transaction.withdrawFundsDate),
            startDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(transaction.startDate),
            endDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(transaction.endDate),
            senderTaxRate: new tax_value_object_1.TaxVO({ value: transaction.senderTaxRate }),
            recipientTaxRate: new tax_value_object_1.TaxVO({ value: transaction.recipientTaxRate }),
            rentDays: transaction.rentDays,
            cost: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: transaction.cost }),
            taxAmount: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: transaction.taxAmount }),
        }));
    }
    setPaymentData(props) {
        this.props.paymentData = new temporary_payment_data_value_object_1.TemporaryPaymentDataVO({
            customerReference: props.customerReference,
            paymentUrl: new value_objects_1.UrlVO(props.paymentUrl),
            paymentUrlStartAt: props.paymentUrlStartAt,
        });
    }
    modifyToPermanent(cardId) {
        if (!this.isValidTemporary) {
            throw new exceptions_1.ArgumentNotProvidedException('Contract not temporary');
        }
        this.props.tenantPaymentMethod = new payment_method_value_object_1.PaymentMethodVO({
            innopayCardId: cardId.value,
            defaultType: enums_1.PaymentMethod.INNOPAY,
        });
        this.props.isTemporary = false;
        this.props.paymentData = null;
        this.validate();
    }
    rollbackChatBookingTemporary() {
        if (!this.isValidTemporary) {
            throw new exceptions_1.ArgumentNotProvidedException('Contract not temporary');
        }
        this.props.status = contract_status_value_object_1.ContractStatusVO.create(enums_1.ContractStatus.OFFERING);
        this.props.isTemporary = false;
        this.props.paymentData = null;
        this.props.nextPaymentTransactionId = undefined;
        this.validate();
    }
    rejectOffer() {
        const { status } = this.props;
        if (status.value !== enums_1.ContractStatus.OFFERING) {
            throw new exceptions_1.ArgumentInvalidException(`You can reject offer if contract status = ${enums_1.ContractStatus.OFFERING} only`);
        }
        this.props.status = contract_status_value_object_1.ContractStatusVO.create(enums_1.ContractStatus.CREATED);
        this.validate();
    }
    setPending() {
        this.props.isPending = true;
    }
    endPending() {
        this.props.isPending = false;
    }
    isReadyToReject() {
        const { status } = this.props;
        if (status.value === enums_1.ContractStatus.CONCLUDED || status.value === enums_1.ContractStatus.OFFERING || this.isPending) {
            return false;
        }
        return true;
    }
    isReadyToAcceptInChat() {
        const { status, shortTermRentBookingType, isTemporary } = this.props;
        return (!isTemporary &&
            status.value === enums_1.ContractStatus.OFFERING &&
            (shortTermRentBookingType === null || shortTermRentBookingType === void 0 ? void 0 : shortTermRentBookingType.value) !== enums_1.ShortTermRentBookingType.INSTANT);
    }
    isActive() {
        const { status } = this.props;
        if (status.value === enums_1.ContractStatus.REJECTED || status.value === enums_1.ContractStatus.COMPLETED) {
            return false;
        }
        return true;
    }
    reject() {
        const isReadyToReject = this.isReadyToReject();
        if (!isReadyToReject) {
            throw new exceptions_1.ArgumentInvalidException('Contract not ready to reject');
        }
        this.props.status = contract_status_value_object_1.ContractStatusVO.create(enums_1.ContractStatus.REJECTED);
        return this;
    }
    setDates(dates) {
        this.props.details = new contract_details_value_object_1.ContractDetailsVO({
            arrivalDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(dates.arrivalDate),
            departureDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(dates.departureDate),
            rules: this.props.details.rules,
        });
        this.validate();
    }
    setNextPaymentTransactionId(nextPaymentTransactionId) {
        this.props.nextPaymentTransactionId = nextPaymentTransactionId;
        this.validate();
    }
    isPartialPaymentNeedToCancel(startCashInDate) {
        var _a;
        const isPartialPaymentType = ((_a = this.props.shortTermRentPaymentType) === null || _a === void 0 ? void 0 : _a.value) === enums_1.ShortTermRentPaymentType.PARTIAL;
        const isPaymentIntervalOver = date_util_1.DateUtil.parseUTC(startCashInDate).add(ContractEntity.PARTIAL_PAYMENT_DAYS_BEFORE_CANCEL, 'day') <
            date_util_1.DateUtil.utcNow();
        return isPartialPaymentType && isPaymentIntervalOver;
    }
    cancel(data, adminCancelMeta) {
        const { paymentTransactions, trigger, newCheckOutDate } = data;
        if (!this.props.isPending) {
            throw new common_1.UnprocessableEntityException('You cannot cancel contract if isPending=false');
        }
        if (!paymentTransactions.every((transaction) => transaction.contractId.equals(this.id))) {
            throw new exceptions_1.ArgumentInvalidException('Some payment transactions not belong to this contract');
        }
        if (!this.isCanCancelled) {
            throw new exceptions_1.ArgumentInvalidException(`You can cancel concluded contract if status = ${enums_1.ContractStatus.CONCLUDED}`);
        }
        const cancelationData = trigger === types_3.CancellationTrigger.TENANT
            ? this.generateTenantCancelationData(paymentTransactions, newCheckOutDate, !!adminCancelMeta)
            : this.generateLandlordCancelationData(paymentTransactions, adminCancelMeta);
        if (!date_util_1.DateUtil.isFuture(cancelationData.checkOutDate)) {
            this.props.status = contract_status_value_object_1.ContractStatusVO.create(enums_1.ContractStatus.REJECTED);
        }
        this.props.nextPaymentTransactionId = undefined;
        const isContainRecomputedLastStayTransaction = (cancelationData) => {
            return ((cancelationData === null || cancelationData === void 0 ? void 0 : cancelationData.recomputedLastStayTransaction) !==
                undefined);
        };
        const isRecomputedLastStayTransaction = isContainRecomputedLastStayTransaction(cancelationData)
            ? !!cancelationData.recomputedLastStayTransaction
            : false;
        const nowIsStayTime = this.props.details.arrivalDate
            ? date_util_1.DateUtil.getDiffHours(date_util_1.DateUtil.utcNow().toISOString(), this.props.details.arrivalDate.value) <= 0
            : false;
        if (isRecomputedLastStayTransaction || nowIsStayTime) {
            this.props.details.decreaseDepartureDate(new date_time_iso_tz_value_object_1.DateTimeISOTZVO(cancelationData.checkOutDate));
        }
        this.validate();
        return cancelationData;
    }
    generateTransactions() {
        const paymentManager = rental_manager_1.PaymentManager.defineStrategy(this);
        const generatedTransactions = paymentManager.handle().data;
        const transactions = generatedTransactions.map((generatedTransaction, index) => payment_transaction_entity_1.PaymentTransactionEntity.create({
            rentPeriodStrategyType: generatedTransaction.rentPeriodStrategyType,
            contractId: this._id,
            totalAmountPayable: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: generatedTransaction.totalAmountPayable }),
            totalAmountToBeTransferred: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: generatedTransaction.totalAmountToBeTransferred }),
            totalRevenue: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: generatedTransaction.totalRevenue }),
            withdrawFundsDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(generatedTransaction.withdrawFundsDate),
            startDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(generatedTransaction.startDate),
            endDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(generatedTransaction.endDate),
            senderTaxRate: new tax_value_object_1.TaxVO({ value: generatedTransaction.senderTaxRate }),
            recipientTaxRate: new tax_value_object_1.TaxVO({ value: generatedTransaction.recipientTaxRate }),
            rentDays: generatedTransaction.rentDays,
            cost: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: generatedTransaction.cost }),
            taxAmount: cost_and_currency_value_object_1.CostAndCurrencyVO.create({ cost: generatedTransaction.taxAmount }),
            isLastPayment: generatedTransaction.isLastPayment,
            isRecurring: !!index && generatedTransactions.length > 1,
            recipientId: this.landlordIdOrFail,
            senderId: this.tenantIdOrFail,
        }));
        return transactions;
    }
    generateTenantCancelationData(paymentTransactions, newCheckOutDate, isCancelationByAdmin = false) {
        const rentalDateGuard = new rental_date_guard_1.RentalDateGuard(this.rentPeriodVersion, this.props.status.value);
        const paymentStrategyType = rentalDateGuard.defineRentPeriodStrategyType({
            arrivalDate: this.arrivalDateOrFail,
            departureDate: this.departureDateOrFail,
        });
        if (paymentStrategyType === types_2.RentPeriodStrategyType.SHORT_TERM_RENT) {
            const cancelationManager = new short_term_rent_tenant_cancelation_strategy_1.ShortTermRentTenantCancelationStrategy(this, paymentTransactions);
            if (isCancelationByAdmin) {
                cancelationManager.cancelByAdmin();
            }
            const result = cancelationManager.handle();
            this.updateTenantContractCancelation(result);
            return result;
        }
        if (paymentStrategyType === types_2.RentPeriodStrategyType.MIDDLE_TERM_RENT) {
            const cancelationManager = new middle_term_rent_tenant_cancelation_strategy_1.MiddleTermRentTenantCancelationStrategy(this, paymentTransactions);
            if (isCancelationByAdmin) {
                cancelationManager.cancelByAdmin();
            }
            const result = cancelationManager.handle(newCheckOutDate === null || newCheckOutDate === void 0 ? void 0 : newCheckOutDate.value);
            this.updateTenantContractCancelation(result);
            return result;
        }
        if (paymentStrategyType === types_2.RentPeriodStrategyType.LONG_TERM_RENT) {
            const cancelationManager = new long_term_rent_tenant_cancelation_strategy_1.LongTermRentTenantCancelationStrategy(this, paymentTransactions);
            if (isCancelationByAdmin) {
                cancelationManager.cancelByAdmin();
            }
            const result = cancelationManager.handle(newCheckOutDate === null || newCheckOutDate === void 0 ? void 0 : newCheckOutDate.value);
            this.updateTenantContractCancelation(result);
            return result;
        }
        throw new exceptions_1.ArgumentNotProvidedException(`PaymentStrategyType = ${paymentStrategyType} not provided`);
    }
    generateLandlordCancelationData(paymentTransactions, adminCancelMeta) {
        const rentalDateGuard = new rental_date_guard_1.RentalDateGuard(this.rentPeriodVersion, this.props.status.value);
        const paymentStrategyType = rentalDateGuard.defineRentPeriodStrategyType({
            arrivalDate: this.arrivalDateOrFail,
            departureDate: this.departureDateOrFail,
        });
        if (paymentStrategyType === types_2.RentPeriodStrategyType.SHORT_TERM_RENT) {
            const cancelationManager = new short_term_rent_landlord_cancelation_strategy_1.ShortTermRentLandlordCancelationStrategy(this, paymentTransactions);
            if (adminCancelMeta) {
                cancelationManager.cancelByAdmin();
                adminCancelMeta.validExcuse && cancelationManager.validExcuse();
            }
            const result = cancelationManager.handle();
            this.updateLandlordContractCancelation(result);
            return result;
        }
        if (paymentStrategyType === types_2.RentPeriodStrategyType.MIDDLE_TERM_RENT) {
            const cancelationManager = new middle_term_rent_landlord_cancelation_strategy_1.MiddleTermRentLandlordCancelationStrategy(this, paymentTransactions);
            if (adminCancelMeta) {
                cancelationManager.cancelByAdmin();
                adminCancelMeta.validExcuse && cancelationManager.validExcuse();
            }
            const result = cancelationManager.handle();
            this.updateLandlordContractCancelation(result);
            return result;
        }
        if (paymentStrategyType === types_2.RentPeriodStrategyType.LONG_TERM_RENT) {
            const cancelationManager = new long_term_rent_landlord_cancelation_strategy_1.LongTermRentLandlordCancelationStrategy(this, paymentTransactions);
            if (adminCancelMeta) {
                cancelationManager.cancelByAdmin();
                adminCancelMeta.validExcuse && cancelationManager.validExcuse();
                adminCancelMeta.force && cancelationManager.forcedCancelation();
            }
            const result = cancelationManager.handle();
            this.updateLandlordContractCancelation(result);
            return result;
        }
        throw new exceptions_1.ArgumentNotProvidedException(`PaymentStrategyType = ${paymentStrategyType} not provided`);
    }
    updateTenantContractCancelation(cancelationData) {
        var _a, _b, _c, _d;
        this.props.contractCancelation = contract_cancelation_entity_1.ContractCancelationEntity.create({
            contractId: this.id,
            triggerUserId: this.tenantIdOrFail,
            cancelationDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(cancelationData.cancelationDate),
            checkOutDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(cancelationData.checkOutDate),
            refundsAmountToSender: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                cost: (_a = cancelationData === null || cancelationData === void 0 ? void 0 : cancelationData.refundsAmountToSender) !== null && _a !== void 0 ? _a : 0,
                currency: types_1.CurrencyType.KZT,
            }),
            transferAmountToPlatform: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                cost: (_b = cancelationData === null || cancelationData === void 0 ? void 0 : cancelationData.transferAmountToPlatform) !== null && _b !== void 0 ? _b : 0,
                currency: types_1.CurrencyType.KZT,
            }),
            transferAmountToRecipient: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                cost: (_c = cancelationData === null || cancelationData === void 0 ? void 0 : cancelationData.transferAmountToRecipient) !== null && _c !== void 0 ? _c : 0,
                currency: types_1.CurrencyType.KZT,
            }),
            withdrawalAmountFromSender: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                cost: (_d = cancelationData === null || cancelationData === void 0 ? void 0 : cancelationData.withdrawalAmountFromSender) !== null && _d !== void 0 ? _d : 0,
                currency: types_1.CurrencyType.KZT,
            }),
            withdrawalAmountFromRecipient: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                cost: 0,
                currency: types_1.CurrencyType.KZT,
            }),
            isFine: false,
        });
    }
    updateLandlordContractCancelation(cancelationData) {
        var _a, _b, _c, _d;
        this.props.contractCancelation = contract_cancelation_entity_1.ContractCancelationEntity.create({
            contractId: this.id,
            triggerUserId: this.landlordIdOrFail,
            cancelationDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(cancelationData.cancelationDate),
            checkOutDate: new date_time_iso_tz_value_object_1.DateTimeISOTZVO(cancelationData.checkOutDate),
            refundsAmountToSender: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                cost: (_a = cancelationData === null || cancelationData === void 0 ? void 0 : cancelationData.refundsAmountToSender) !== null && _a !== void 0 ? _a : 0,
                currency: types_1.CurrencyType.KZT,
            }),
            transferAmountToPlatform: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                cost: (_b = cancelationData === null || cancelationData === void 0 ? void 0 : cancelationData.transferAmountToPlatform) !== null && _b !== void 0 ? _b : 0,
                currency: types_1.CurrencyType.KZT,
            }),
            transferAmountToRecipient: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                cost: (_c = cancelationData === null || cancelationData === void 0 ? void 0 : cancelationData.transferAmountToRecipient) !== null && _c !== void 0 ? _c : 0,
                currency: types_1.CurrencyType.KZT,
            }),
            withdrawalAmountFromSender: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                cost: 0,
                currency: types_1.CurrencyType.KZT,
            }),
            withdrawalAmountFromRecipient: cost_and_currency_value_object_1.CostAndCurrencyVO.create({
                cost: (_d = cancelationData === null || cancelationData === void 0 ? void 0 : cancelationData.withdrawalAmountFromRecipient) !== null && _d !== void 0 ? _d : 0,
                currency: types_1.CurrencyType.KZT,
            }),
            isFine: cancelationData.isFine,
        });
    }
    get id() {
        return this._id;
    }
    get status() {
        return this.props.status;
    }
    get landlord() {
        return this.props.landlordId;
    }
    get tenant() {
        return this.props.tenantId;
    }
    get apartmentRentPeriodType() {
        return this.props.apartmentRentPeriodType;
    }
    get rules() {
        var _a;
        return (_a = this.props.details.rules) === null || _a === void 0 ? void 0 : _a.unpack();
    }
    get arrivalDate() {
        return this.props.details.arrivalDate;
    }
    get departureDate() {
        return this.props.details.departureDate;
    }
    get isPending() {
        return this.props.isPending;
    }
    get isFined() {
        return this.props.isFined;
    }
    get isTemporary() {
        return this.props.isTemporary;
    }
    get costAndCurrency() {
        return this.props.costAndCurrency;
    }
    get rentPeriodVersion() {
        return this.props.rentPeriodVersion;
    }
    get timezone() {
        return this.props.baseContractApartmentAdData.timezone;
    }
    get apartmentAdIdOrFail() {
        const { apartmentAdId } = this.props;
        if (!apartmentAdId) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('ApartmentAdId required');
        }
        return apartmentAdId;
    }
    get cancellationPolicy() {
        return this.props.cancellationPolicy.unpack();
    }
    get paymentType() {
        var _a;
        return (_a = this.props.shortTermRentPaymentType) === null || _a === void 0 ? void 0 : _a.value;
    }
    get tenantIdOrFail() {
        const { tenantId } = this.props;
        if (!tenantId) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('TenantId required');
        }
        return tenantId;
    }
    get landlordIdOrFail() {
        const { landlordId } = this.props;
        if (!landlordId) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('LandlordId required');
        }
        return landlordId;
    }
    get arrivalDateOrFail() {
        var _a;
        const arrivalDate = (_a = this.props.details.arrivalDate) === null || _a === void 0 ? void 0 : _a.value;
        if (!arrivalDate) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Arrival date required');
        }
        return arrivalDate;
    }
    get tenantPaymentCardOrFail() {
        var _a;
        const innopayCardId = (_a = this.props.tenantPaymentMethod) === null || _a === void 0 ? void 0 : _a.innopayCardId;
        if (!innopayCardId) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Innopay card id required');
        }
        return innopayCardId;
    }
    get paymentDataOrFail() {
        const paymentData = this.props.paymentData;
        if (!paymentData) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Payment url required');
        }
        return {
            paymentUrl: paymentData.paymentUrl,
            paymentUrlStartAt: paymentData.paymentUrlStartAt,
            customerReference: paymentData.customerReference,
        };
    }
    get paymentData() {
        return this.props.paymentData;
    }
    get isValidTemporary() {
        return this.props.isTemporary && this.props.status.value === enums_1.ContractStatus.CONCLUDED;
    }
    get shortTermRentBookingType() {
        var _a;
        return (_a = this.props.shortTermRentBookingType) === null || _a === void 0 ? void 0 : _a.value;
    }
    get departureDateOrFail() {
        var _a;
        const departureDate = (_a = this.props.details.departureDate) === null || _a === void 0 ? void 0 : _a.value;
        if (!departureDate) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Departure date required');
        }
        return departureDate;
    }
    get systemMessageData() {
        const { status, apartmentRentPeriodType, details, costAndCurrency, cancellationPolicy, shortTermRentBookingType, shortTermRentPaymentType, } = this.props;
        return {
            status: status.value,
            apartmentRentPeriodType,
            arrivalDate: details.arrivalDate ? new Date(details.arrivalDate.value) : undefined,
            departureDate: details.departureDate ? new Date(details.departureDate.value) : undefined,
            rules: this.rules,
            cost: costAndCurrency.cost,
            longTermRentCancellationPolicyType: cancellationPolicy.longTermCancellationPolicy,
            shortTermRentCancellationPolicyType: cancellationPolicy.shortTermCancellationPolicy,
            shortTermRentBookingType: shortTermRentBookingType === null || shortTermRentBookingType === void 0 ? void 0 : shortTermRentBookingType.value,
            shortTermRentPaymentType: shortTermRentPaymentType === null || shortTermRentPaymentType === void 0 ? void 0 : shortTermRentPaymentType.value,
        };
    }
    get isCanCancelled() {
        return this.props.status.value === enums_1.ContractStatus.CONCLUDED;
    }
    completePast() {
        if (!this.departureDate) {
            return;
        }
        const isConcluded = this.status.value === enums_1.ContractStatus.CONCLUDED;
        const isPast = date_util_1.DateUtil.parse(this.departureDate.value).isBefore(date_util_1.DateUtil.utcNow());
        if (isConcluded && isPast && !this.props.isExistUnpaidTransactions) {
            this.props.status = contract_status_value_object_1.ContractStatusVO.create(enums_1.ContractStatus.COMPLETED);
        }
    }
    validate() {
        const { details, status, tenantId, apartmentRentPeriodType, landlordId, baseContractApartmentAdData } = this.props;
        const fields = [details, status, apartmentRentPeriodType, baseContractApartmentAdData];
        if (fields.some((f) => f == null)) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Contract must to have complete all required fields');
        }
        if (tenantId && tenantId.equals(landlordId)) {
            throw new exceptions_1.ArgumentInvalidException('TenantId mut be not equals landlordId');
        }
        this.validateShortTermRent();
        this.validateLongTermRent();
        this.validatePeriod();
        this.validateCancellationPolicy();
        this.validateActiveRequiredFields();
        this.validateOffer();
        this.validatePermanentConcluded();
        this.validateTemporaryConcluded();
        this.validateInstantBooking();
    }
    validateShortTermRent() {
        const { apartmentRentPeriodType, costAndCurrency, shortTermRentBookingType, shortTermRentPaymentType } = this.props;
        if (apartmentRentPeriodType !== enums_1.ApartmentRentPeriodType.SHORT_TERM) {
            return;
        }
        if (!(constants_1.SHORT_RENT_PERIOD_MIN_COST <= costAndCurrency.cost && costAndCurrency.cost <= constants_1.SHORT_RENT_PERIOD_MAX_COST)) {
            throw new exceptions_1.ArgumentOutOfRangeException(`Cost for short term must be between ${constants_1.SHORT_RENT_PERIOD_MIN_COST} and ${constants_1.SHORT_RENT_PERIOD_MAX_COST}`);
        }
        if (!shortTermRentBookingType) {
            throw new exceptions_1.ArgumentInvalidException('Rent booking type required for short term rent period');
        }
        if (!shortTermRentPaymentType) {
            throw new exceptions_1.ArgumentInvalidException('Rent payment type required for short term rent period');
        }
    }
    validateLongTermRent() {
        const { apartmentRentPeriodType, costAndCurrency, shortTermRentBookingType, shortTermRentPaymentType } = this.props;
        if (apartmentRentPeriodType !== enums_1.ApartmentRentPeriodType.LONG_TERM) {
            return;
        }
        if (!(constants_1.LONG_RENT_PERIOD_MIN_COST <= costAndCurrency.cost && costAndCurrency.cost <= constants_1.LONG_RENT_PERIOD_MAX_COST)) {
            throw new exceptions_1.ArgumentOutOfRangeException(`Cost for long term must be between ${constants_1.LONG_RENT_PERIOD_MIN_COST} and ${constants_1.LONG_RENT_PERIOD_MAX_COST}`);
        }
        if (shortTermRentBookingType) {
            throw new exceptions_1.ArgumentInvalidException('Rent booking type available only for short term rent period');
        }
        if (shortTermRentPaymentType) {
            throw new exceptions_1.ArgumentInvalidException('Rent payment type available only for short term rent period');
        }
    }
    validatePeriod() {
        var _a;
        const { apartmentRentPeriodType, rentPeriodVersion } = this.props;
        const { arrivalDate, departureDate } = this.props.details;
        if (!rentPeriodVersion) {
            throw new illegal_operation_exception_1.IllegalOperationException('Contract must have rent period data');
        }
        if (!arrivalDate && !departureDate) {
            return;
        }
        if ((_a = this.props) === null || _a === void 0 ? void 0 : _a.contractCancelation) {
            return;
        }
        if (!arrivalDate || !departureDate) {
            throw new exceptions_1.ArgumentInvalidException('Arrival and departure date required');
        }
        const rentalDateGuard = new rental_date_guard_1.RentalDateGuard(rentPeriodVersion, this.props.status.value);
        const paymentStrategyType = rentalDateGuard.defineRentPeriodStrategyType({
            arrivalDate: arrivalDate.value,
            departureDate: departureDate.value,
        }, apartmentRentPeriodType);
        rentalDateGuard.validateOrThrowError({ arrivalDate: arrivalDate.value, departureDate: departureDate.value }, paymentStrategyType);
    }
    validateCancellationPolicy() {
        const { apartmentRentPeriodType, cancellationPolicy } = this.props;
        if (apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.SHORT_TERM &&
            !cancellationPolicy.shortTermCancellationPolicy) {
            throw new exceptions_1.ArgumentInvalidException('Short term cancellation policy required');
        }
        if (apartmentRentPeriodType === enums_1.ApartmentRentPeriodType.LONG_TERM &&
            !cancellationPolicy.longTermCancellationPolicy) {
            throw new exceptions_1.ArgumentInvalidException('Long term cancellation policy required');
        }
    }
    validateActiveRequiredFields() {
        const { status, tenantId, landlordId, apartmentAdId } = this.props;
        if (status.value == enums_1.ContractStatus.COMPLETED || status.value === enums_1.ContractStatus.REJECTED) {
            return;
        }
        if (!tenantId) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Tenant id required');
        }
        if (!landlordId) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Landlord id required');
        }
        if (!apartmentAdId) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Apartment ad id required');
        }
    }
    validateOffer() {
        const { status } = this.props;
        const { arrivalDate, departureDate, rules } = this.props.details;
        if (enums_1.ContractStatus.OFFERING !== status.value) {
            return;
        }
        if (!arrivalDate) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Arrival date required');
        }
        if (!departureDate) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Departure date required');
        }
        if (!rules) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Rules required');
        }
    }
    validatePermanentConcluded() {
        const { tenantPaymentMethod, status, isTemporary } = this.props;
        const { arrivalDate, departureDate, rules } = this.props.details;
        if (status.value !== enums_1.ContractStatus.CONCLUDED || isTemporary) {
            return;
        }
        if (!arrivalDate) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Arrival date required');
        }
        if (!tenantPaymentMethod) {
            throw new exceptions_1.ArgumentInvalidException('tenantPaymentMethod must be provided for permanent concluded contract');
        }
        if (!departureDate) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Departure date required');
        }
        if (!rules) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Rules required');
        }
    }
    validateTemporaryConcluded() {
        const { tenantPaymentMethod, status, isTemporary, shortTermRentBookingType } = this.props;
        const { arrivalDate, departureDate, rules } = this.props.details;
        if (!isTemporary) {
            return;
        }
        if (status.value !== enums_1.ContractStatus.CONCLUDED &&
            !((shortTermRentBookingType === null || shortTermRentBookingType === void 0 ? void 0 : shortTermRentBookingType.value) === enums_1.ShortTermRentBookingType.INSTANT && status.value === enums_1.ContractStatus.CREATED)) {
            throw new exceptions_1.ArgumentNotProvidedException(`Temporary contract exist only with status = ${enums_1.ContractStatus.CONCLUDED}, or ${enums_1.ContractStatus.CREATED} in instant booking process`);
        }
        if (!arrivalDate) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Arrival date required');
        }
        if (tenantPaymentMethod) {
            throw new exceptions_1.ArgumentInvalidException('tenantPaymentMethod must not be provided for temporary concluded contract');
        }
        if (!departureDate) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Departure date required');
        }
        if (!rules) {
            throw new contract_errors_1.ContractHasEmptyFieldsError('Rules required');
        }
    }
    validateInstantBooking() {
        const { shortTermRentBookingType, tenantPaymentMethod, isTemporary } = this.props;
        if ((shortTermRentBookingType === null || shortTermRentBookingType === void 0 ? void 0 : shortTermRentBookingType.value) !== enums_1.ShortTermRentBookingType.INSTANT) {
            return;
        }
        if (!tenantPaymentMethod && !isTemporary) {
            throw new exceptions_1.ArgumentInvalidException('Tenant payment method required for instant booking');
        }
    }
}
exports.ContractEntity = ContractEntity;
ContractEntity.PARTIAL_PAYMENT_DAYS_BEFORE_CANCEL = 7;
ContractEntity.TEMPORARY_CONTRACT_LIFE_TIME_PER_MINUTES = 30;
//# sourceMappingURL=contract.entity.js.map