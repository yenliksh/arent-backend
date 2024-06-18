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
var SystemMessageDataModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemMessageDataModel = void 0;
const enums_1 = require("../../../../../infrastructure/enums");
const apartment_ad_rules_model_1 = require("../../../../../infrastructure/models/apartment-ad-rules.model");
const minimal_unit_helper_1 = require("../../../../../libs/utils/minimal-unit.helper");
const graphql_1 = require("@nestjs/graphql");
let SystemMessageDataModel = SystemMessageDataModel_1 = class SystemMessageDataModel {
    constructor(model) {
        var _a, _b;
        const assignObject = {
            status: model.status,
            apartmentRentPeriodType: model.apartmentRentPeriodType,
            arrivalDate: (_a = model.arrivalDate) === null || _a === void 0 ? void 0 : _a.toISOString(),
            comment: model.comment,
            cost: model.cost ? (0, minimal_unit_helper_1.toMinorUnitString)(model.cost) : undefined,
            departureDate: (_b = model.departureDate) === null || _b === void 0 ? void 0 : _b.toISOString(),
            longTermRentCancellationPolicyType: model.longTermRentCancellationPolicyType,
            rules: model.rules ? apartment_ad_rules_model_1.ApartmentAdRulesModel.create(model.rules) : undefined,
            shortTermRentCancellationPolicyType: model.shortTermRentCancellationPolicyType,
            shortTermRentBookingType: model.shortTermRentBookingType,
            shortTermRentPaymentType: model.shortTermRentPaymentType,
        };
        Object.assign(this, assignObject);
    }
    static create(props) {
        const transformedProps = SystemMessageDataModel_1.transform(props);
        return new SystemMessageDataModel_1(transformedProps);
    }
    static transform(props) {
        var _a;
        return {
            ...props,
            arrivalDate: props.arrivalDate ? new Date(props.arrivalDate) : undefined,
            departureDate: props.departureDate ? new Date(props.departureDate) : undefined,
            transactionsMeta: (_a = props.transactionsMeta) === null || _a === void 0 ? void 0 : _a.map((meta) => ({
                ...meta,
                endDate: new Date(meta.endDate),
                startDate: new Date(meta.startDate),
                withdrawFundsDate: new Date(meta.withdrawFundsDate),
            })),
        };
    }
};
__decorate([
    (0, graphql_1.Field)(() => apartment_ad_rules_model_1.ApartmentAdRulesModel, { nullable: true }),
    __metadata("design:type", apartment_ad_rules_model_1.ApartmentAdRulesModel)
], SystemMessageDataModel.prototype, "rules", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SystemMessageDataModel.prototype, "cost", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SystemMessageDataModel.prototype, "arrivalDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SystemMessageDataModel.prototype, "departureDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ShortTermRentCancellationPolicyType, { nullable: true }),
    __metadata("design:type", String)
], SystemMessageDataModel.prototype, "shortTermRentCancellationPolicyType", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.LongTermRentCancellationPolicyType, { nullable: true }),
    __metadata("design:type", String)
], SystemMessageDataModel.prototype, "longTermRentCancellationPolicyType", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ApartmentRentPeriodType, { nullable: true }),
    __metadata("design:type", String)
], SystemMessageDataModel.prototype, "apartmentRentPeriodType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], SystemMessageDataModel.prototype, "comment", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ContractStatus),
    __metadata("design:type", String)
], SystemMessageDataModel.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ShortTermRentBookingType, { nullable: true }),
    __metadata("design:type", String)
], SystemMessageDataModel.prototype, "shortTermRentBookingType", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ShortTermRentPaymentType, { nullable: true }),
    __metadata("design:type", String)
], SystemMessageDataModel.prototype, "shortTermRentPaymentType", void 0);
SystemMessageDataModel = SystemMessageDataModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [Object])
], SystemMessageDataModel);
exports.SystemMessageDataModel = SystemMessageDataModel;
//# sourceMappingURL=system-message-data.model.js.map