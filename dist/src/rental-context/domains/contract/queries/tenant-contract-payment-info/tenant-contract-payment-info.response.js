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
var TenantContractPaymentInfoResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantContractPaymentInfoResponse = void 0;
const types_1 = require("../../types");
const minimal_unit_helper_1 = require("../../../../../libs/utils/minimal-unit.helper");
const graphql_1 = require("@nestjs/graphql");
let TenantContractPaymentInfoResponse = TenantContractPaymentInfoResponse_1 = class TenantContractPaymentInfoResponse {
    static create(props) {
        var _a;
        const payload = new TenantContractPaymentInfoResponse_1();
        payload.type = props.type;
        payload.paidAmount = (0, minimal_unit_helper_1.toMinorUnitString)(props.paidAmount);
        payload.payableAmount = (0, minimal_unit_helper_1.toMinorUnitString)(props.payableAmount);
        payload.totalAmount = (0, minimal_unit_helper_1.toMinorUnitString)(props.totalAmount);
        payload.refundsAmount = (0, minimal_unit_helper_1.toMinorUnitString)(props.refundsAmount);
        payload.payableAmountOfNextCharge = props.payableAmountOfNextCharge
            ? (0, minimal_unit_helper_1.toMinorUnitString)(props.payableAmountOfNextCharge)
            : undefined;
        payload.dateOfNextCharge = props.dateOfNextCharge ? props.dateOfNextCharge.toISOString() : undefined;
        payload.accommodationAvailableDate = props.accommodationAvailableDate
            ? props.accommodationAvailableDate.toISOString()
            : undefined;
        payload.cancellationDate = (_a = props.cancellationDate) === null || _a === void 0 ? void 0 : _a.toISOString();
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => types_1.ContractPaymentStatusType),
    __metadata("design:type", String)
], TenantContractPaymentInfoResponse.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TenantContractPaymentInfoResponse.prototype, "paidAmount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TenantContractPaymentInfoResponse.prototype, "payableAmount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TenantContractPaymentInfoResponse.prototype, "totalAmount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TenantContractPaymentInfoResponse.prototype, "refundsAmount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], TenantContractPaymentInfoResponse.prototype, "payableAmountOfNextCharge", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], TenantContractPaymentInfoResponse.prototype, "dateOfNextCharge", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], TenantContractPaymentInfoResponse.prototype, "accommodationAvailableDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], TenantContractPaymentInfoResponse.prototype, "cancellationDate", void 0);
TenantContractPaymentInfoResponse = TenantContractPaymentInfoResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], TenantContractPaymentInfoResponse);
exports.TenantContractPaymentInfoResponse = TenantContractPaymentInfoResponse;
//# sourceMappingURL=tenant-contract-payment-info.response.js.map