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
var TenantContractCancelationInfoResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantContractCancelationInfoResponse = void 0;
const types_1 = require("../../base-classes/rental-cancelation-strategies/types");
const types_2 = require("../../base-classes/rental-manager/types");
const minimal_unit_helper_1 = require("../../../../../libs/utils/minimal-unit.helper");
const graphql_1 = require("@nestjs/graphql");
let TenantContractCancelationInfoResponse = TenantContractCancelationInfoResponse_1 = class TenantContractCancelationInfoResponse {
    static create(props) {
        var _a;
        const payload = new TenantContractCancelationInfoResponse_1();
        payload.strategyType = props.strategyType;
        payload.cancelationDate = props.cancelationDate;
        payload.checkOutDate = props.checkOutDate;
        payload.refundsAmount = (0, minimal_unit_helper_1.toMinorUnitString)(props.refundsAmountToSender);
        payload.withdrawalAmount = isLongPeriodCancelation(props)
            ? (0, minimal_unit_helper_1.toMinorUnitString)(props.withdrawalAmountFromSender || 0)
            : undefined;
        payload.checkoutType = isLongPeriodCancelation(props) ? props.checkoutType : undefined;
        payload.recomputedLastStayWithdrawalAmount = isLongPeriodCancelation(props)
            ? (0, minimal_unit_helper_1.toMinorUnitString)(((_a = props === null || props === void 0 ? void 0 : props.recomputedLastStayTransaction) === null || _a === void 0 ? void 0 : _a.totalAmountPayable) || 0)
            : undefined;
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => types_2.RentPeriodStrategyType),
    __metadata("design:type", String)
], TenantContractCancelationInfoResponse.prototype, "strategyType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TenantContractCancelationInfoResponse.prototype, "cancelationDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TenantContractCancelationInfoResponse.prototype, "checkOutDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'money which will bee refund' }),
    __metadata("design:type", String)
], TenantContractCancelationInfoResponse.prototype, "refundsAmount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'money which will bee withdrawal' }),
    __metadata("design:type", String)
], TenantContractCancelationInfoResponse.prototype, "withdrawalAmount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'recomputed withdrawal for last stay month' }),
    __metadata("design:type", String)
], TenantContractCancelationInfoResponse.prototype, "recomputedLastStayWithdrawalAmount", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.LongPeriodTenantCheckOutCancelationType, { nullable: true }),
    __metadata("design:type", String)
], TenantContractCancelationInfoResponse.prototype, "checkoutType", void 0);
TenantContractCancelationInfoResponse = TenantContractCancelationInfoResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], TenantContractCancelationInfoResponse);
exports.TenantContractCancelationInfoResponse = TenantContractCancelationInfoResponse;
const isLongPeriodCancelation = (props) => {
    return (props.strategyType === types_2.RentPeriodStrategyType.LONG_TERM_RENT ||
        props.strategyType === types_2.RentPeriodStrategyType.MIDDLE_TERM_RENT);
};
//# sourceMappingURL=tenant-contract-cancelation-info.response.js.map