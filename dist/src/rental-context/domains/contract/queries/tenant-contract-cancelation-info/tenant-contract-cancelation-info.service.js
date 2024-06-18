"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantContractCancelationInfoService = void 0;
const contract_repository_1 = require("../../../../domain-repositories/contract/contract.repository");
const payment_transaction_repository_1 = require("../../../../domain-repositories/payment-transaction/payment-transaction.repository");
const long_term_rent_tenant_cancelation_strategy_1 = require("../../base-classes/rental-cancelation-strategies/long-term-rent-cancelation-strategies/long-term-rent-tenant-cancelation.strategy");
const middle_term_rent_tenant_cancelation_strategy_1 = require("../../base-classes/rental-cancelation-strategies/middle-term-rent-cancelation-strategies/middle-term-rent-tenant-cancelation.strategy");
const short_term_rent_tenant_cancelation_strategy_1 = require("../../base-classes/rental-cancelation-strategies/short-term-rent-cancelation-strategies/short-term-rent-tenant-cancelation.strategy");
const rental_date_guard_1 = require("../../base-classes/rental-guards/rental-date.guard");
const types_1 = require("../../base-classes/rental-manager/types");
const uuid_value_object_1 = require("../../../../../libs/ddd/domain/value-objects/uuid.value-object");
const date_util_1 = require("../../../../../libs/utils/date-util");
const common_1 = require("@nestjs/common");
let TenantContractCancelationInfoService = class TenantContractCancelationInfoService {
    constructor(contractRepository, paymentTransactionRepository) {
        this.contractRepository = contractRepository;
        this.paymentTransactionRepository = paymentTransactionRepository;
    }
    async handle(dto, userId) {
        const { id, checkoutDate } = dto;
        const contract = await this.contractRepository.findOne({ id: new uuid_value_object_1.UUID(id), tenantId: new uuid_value_object_1.UUID(userId) });
        if (!contract) {
            throw new common_1.NotFoundException('Contract not found');
        }
        if (!contract.isActive()) {
            throw new common_1.UnprocessableEntityException('Contract not active');
        }
        const hours = date_util_1.DateUtil.parse(contract.departureDateOrFail).hour();
        const minutes = date_util_1.DateUtil.parse(contract.departureDateOrFail).minute();
        const checkoutDateUtc = date_util_1.DateUtil.formatDateTimeTzToUtc(`${checkoutDate !== null && checkoutDate !== void 0 ? checkoutDate : date_util_1.DateUtil.now().tz(contract.timezone).format('YYYY-MM-DD')} ${hours}:${minutes}`, contract.timezone).toISOString();
        const transactions = await this.paymentTransactionRepository.findMany({ contractId: contract.id });
        const rentalDateGuard = new rental_date_guard_1.RentalDateGuard(contract.rentPeriodVersion, contract.status.value);
        const paymentStrategyType = rentalDateGuard.defineRentPeriodStrategyType({
            arrivalDate: contract.arrivalDateOrFail,
            departureDate: contract.departureDateOrFail,
        });
        if (paymentStrategyType === types_1.RentPeriodStrategyType.SHORT_TERM_RENT) {
            const cancelationManager = new short_term_rent_tenant_cancelation_strategy_1.ShortTermRentTenantCancelationStrategy(contract, transactions);
            const result = cancelationManager.handle();
            return result;
        }
        if (paymentStrategyType === types_1.RentPeriodStrategyType.MIDDLE_TERM_RENT) {
            const cancelationManager = new middle_term_rent_tenant_cancelation_strategy_1.MiddleTermRentTenantCancelationStrategy(contract, transactions);
            const result = cancelationManager.handle(checkoutDateUtc);
            return result;
        }
        if (paymentStrategyType === types_1.RentPeriodStrategyType.LONG_TERM_RENT) {
            const cancelationManager = new long_term_rent_tenant_cancelation_strategy_1.LongTermRentTenantCancelationStrategy(contract, transactions);
            const result = cancelationManager.handle(checkoutDateUtc);
            return result;
        }
        throw new common_1.UnprocessableEntityException(`PaymentStrategyType = ${paymentStrategyType} not provided`);
    }
};
TenantContractCancelationInfoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contract_repository_1.ContractRepository,
        payment_transaction_repository_1.PaymentTransactionRepository])
], TenantContractCancelationInfoService);
exports.TenantContractCancelationInfoService = TenantContractCancelationInfoService;
//# sourceMappingURL=tenant-contract-cancelation-info.service.js.map