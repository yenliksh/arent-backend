"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantContractPaymentInfoService = void 0;
const rent_period_version_orm_mapper_1 = require("../../../../domain-repositories/rent-period-version/rent-period-version.orm-mapper");
const rental_date_guard_1 = require("../../base-classes/rental-guards/rental-date.guard");
const types_1 = require("../../base-classes/rental-manager/types");
const types_2 = require("../../types");
const types_3 = require("../../../payment-transaction/domain/types");
const rent_period_version_entity_1 = require("../../../rent-period-version/domain/rent-period-version.entity");
const contract_orm_entity_1 = require("../../../../../infrastructure/database/entities/contract.orm-entity");
const payment_transaction_orm_entity_1 = require("../../../../../infrastructure/database/entities/payment-transaction.orm-entity");
const enums_1 = require("../../../../../infrastructure/enums");
const date_util_1 = require("../../../../../libs/utils/date-util");
const common_1 = require("@nestjs/common");
let TenantContractPaymentInfoService = class TenantContractPaymentInfoService {
    async handle(dto, userId) {
        var _a, _b, _c;
        const { id } = dto;
        const contractQuery = contract_orm_entity_1.ContractOrmEntity.query()
            .findById(id)
            .where('tenantId', userId)
            .withGraphFetched({ rentPeriodVersion: true, contractCancelation: true });
        const transactionsQuery = payment_transaction_orm_entity_1.PaymentTransactionOrmEntity.query().where('contractId', id);
        const [contract, transactions] = await Promise.all([contractQuery, transactionsQuery]);
        if (!contract) {
            throw new common_1.NotFoundException('Contract not found');
        }
        if (!transactions.every((t) => t.contractId === contract.id)) {
            throw new common_1.NotFoundException("Transactions doesn't related with contract");
        }
        const contractCancelation = contract.contractCancelation;
        const paidAmount = transactions.reduce((paidAmount, t) => [types_3.PaymentTransactionStatus.CASH_OUT_WAITING, types_3.PaymentTransactionStatus.COMPLETED].includes(t.status)
            ? paidAmount + Number(t.totalAmountPayable)
            : paidAmount, 0);
        const payableAmount = transactions.reduce((paidAmount, t) => [types_3.PaymentTransactionStatus.CASH_IN_WAITING, types_3.PaymentTransactionStatus.CANCELED].includes(t.status)
            ? paidAmount + t.totalAmountPayable
            : paidAmount, 0);
        const totalAmount = transactions.reduce((paidAmount, t) => paidAmount + t.totalAmountPayable, 0);
        const { withdrawFundsDate: dateOfNextCharge, totalAmountPayable: payableAmountOfNextCharge } = ((_a = [...transactions]
            .filter((t) => t.status === types_3.PaymentTransactionStatus.CASH_IN_WAITING)
            .sort((a, b) => (date_util_1.DateUtil.parseUTC(a.startDate).isBefore(b.startDate) ? -1 : 1))) === null || _a === void 0 ? void 0 : _a[0]) || {};
        const { endDate: accommodationAvailableDate } = ((_b = [...transactions]
            .filter((t) => [types_3.PaymentTransactionStatus.CASH_OUT_WAITING, types_3.PaymentTransactionStatus.COMPLETED].includes(t.status))
            .sort((a, b) => (date_util_1.DateUtil.parseUTC(a.startDate).isBefore(b.startDate) ? 1 : -1))) === null || _b === void 0 ? void 0 : _b[0]) || {};
        const type = await this.defineContractPaymentStatusType(transactions, contract);
        const paymentInfo = {
            type,
            paidAmount,
            payableAmount,
            totalAmount,
            dateOfNextCharge,
            payableAmountOfNextCharge,
            accommodationAvailableDate,
            refundsAmount: (_c = contractCancelation === null || contractCancelation === void 0 ? void 0 : contractCancelation.refundsAmountToSenderCost) !== null && _c !== void 0 ? _c : 0,
            cancellationDate: contractCancelation === null || contractCancelation === void 0 ? void 0 : contractCancelation.createdAt,
        };
        return paymentInfo;
    }
    async defineContractPaymentStatusType(transactions, contract) {
        var _a, _b;
        const { apartmentRentPeriodType, rentPaymentType } = contract;
        if (contract.status === enums_1.ContractStatus.REJECTED && !transactions.length) {
            return types_2.ContractPaymentStatusType.CANCELED;
        }
        if (contract.contractCancelation) {
            return types_2.ContractPaymentStatusType.REFUND;
        }
        const rentPeriodVersion = contract.rentPeriodVersion;
        if (!rentPeriodVersion) {
            throw new common_1.UnprocessableEntityException('Contract must be related with rent period version');
        }
        const arrivalDate = (_a = contract.arrivalDate) === null || _a === void 0 ? void 0 : _a.toISOString();
        const departureDate = (_b = contract.departureDate) === null || _b === void 0 ? void 0 : _b.toISOString();
        if (!arrivalDate || !departureDate) {
            throw new common_1.UnprocessableEntityException('Contract must have arrival and departure dates');
        }
        const mapper = new rent_period_version_orm_mapper_1.RentPeriodVersionOrmMapper(rent_period_version_entity_1.RentPeriodVersionEntity);
        const ormRentPeriodVersion = await mapper.toDomainEntity(rentPeriodVersion);
        const rentalDateGuard = new rental_date_guard_1.RentalDateGuard(ormRentPeriodVersion, contract.status);
        const paymentStrategyType = rentalDateGuard.defineRentPeriodStrategyType({
            arrivalDate,
            departureDate,
        }, apartmentRentPeriodType);
        if (enums_1.ShortTermRentPaymentType.FULL === rentPaymentType &&
            paymentStrategyType === types_1.RentPeriodStrategyType.SHORT_TERM_RENT) {
            return types_2.ContractPaymentStatusType.SHORT_FULL;
        }
        if (enums_1.ShortTermRentPaymentType.PARTIAL === rentPaymentType &&
            paymentStrategyType === types_1.RentPeriodStrategyType.SHORT_TERM_RENT) {
            return types_2.ContractPaymentStatusType.SHORT_PARTIAL;
        }
        if ([types_1.RentPeriodStrategyType.MIDDLE_TERM_RENT, types_1.RentPeriodStrategyType.LONG_TERM_RENT].includes(paymentStrategyType)) {
            const isCompleted = transactions.every((t) => [types_3.PaymentTransactionStatus.CASH_OUT_WAITING, types_3.PaymentTransactionStatus.COMPLETED].includes(t.status));
            if (isCompleted) {
                return types_2.ContractPaymentStatusType.RECURRING_COMPLETED;
            }
            return types_2.ContractPaymentStatusType.RECURRING;
        }
        throw new common_1.UnprocessableEntityException('Payment status type is not defined');
    }
};
TenantContractPaymentInfoService = __decorate([
    (0, common_1.Injectable)()
], TenantContractPaymentInfoService);
exports.TenantContractPaymentInfoService = TenantContractPaymentInfoService;
//# sourceMappingURL=tenant-contract-payment-info.service.js.map