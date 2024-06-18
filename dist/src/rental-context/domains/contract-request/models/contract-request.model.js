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
var ContractRequestModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRequestModel = void 0;
const apartment_ad_model_1 = require("../../apartment-ad/models/apartment-ad.model");
const contract_model_1 = require("../../contract/models/contract.model");
const user_model_1 = require("../../user/models/user.model");
const contract_request_orm_entity_1 = require("../../../../infrastructure/database/entities/contract-request.orm-entity");
const field_from_resolver_decorator_1 = require("../../../../infrastructure/decorators/field-from-resolver.decorator");
const enums_1 = require("../../../../infrastructure/enums");
const model_base_1 = require("../../../../libs/ddd/interface-adapters/base-classes/model.base");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../domain/types");
const apartment_guests_model_1 = require("./sub-models/apartment-guests.model");
let ContractRequestModel = ContractRequestModel_1 = class ContractRequestModel extends model_base_1.ModelBase {
    constructor(contractRequest) {
        super(contractRequest);
    }
    static create(props) {
        var _a, _b;
        const payload = new ContractRequestModel_1(props);
        const contractProps = {
            tenantId: props.tenantId,
            apartmentAdId: props.apartmentAdId,
            apartmentRentPeriodType: props.apartmentRentPeriodType,
            arrivalDate: (_a = props.arrivalDate) === null || _a === void 0 ? void 0 : _a.toISOString(),
            departureDate: (_b = props.departureDate) === null || _b === void 0 ? void 0 : _b.toISOString(),
            status: props.status,
            comment: props.comment,
            contract: props.contract ? new contract_model_1.BaseContractModel(props.contract) : undefined,
            rejectReason: props.rejectReason,
            guests: apartment_guests_model_1.ApartmentGuestsModel.create(props.guests),
        };
        Object.assign(payload, contractProps);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContractRequestModel.prototype, "tenantId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContractRequestModel.prototype, "apartmentAdId", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.ApartmentRentPeriodType),
    __metadata("design:type", String)
], ContractRequestModel.prototype, "apartmentRentPeriodType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContractRequestModel.prototype, "arrivalDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContractRequestModel.prototype, "departureDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.ContractRequestStatus),
    __metadata("design:type", String)
], ContractRequestModel.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => apartment_guests_model_1.ApartmentGuestsModel),
    __metadata("design:type", apartment_guests_model_1.ApartmentGuestsModel)
], ContractRequestModel.prototype, "guests", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContractRequestModel.prototype, "comment", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContractRequestModel.prototype, "rejectReason", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => contract_model_1.BaseContractModel, { nullable: true }),
    __metadata("design:type", contract_model_1.BaseContractModel)
], ContractRequestModel.prototype, "contract", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => user_model_1.UserModel),
    __metadata("design:type", user_model_1.UserModel)
], ContractRequestModel.prototype, "tenant", void 0);
__decorate([
    (0, field_from_resolver_decorator_1.FieldFromResolver)(() => apartment_ad_model_1.ApartmentAdViewModel),
    __metadata("design:type", apartment_ad_model_1.ApartmentAdViewModel)
], ContractRequestModel.prototype, "apartmentAd", void 0);
ContractRequestModel = ContractRequestModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [contract_request_orm_entity_1.ContractRequestOrmEntity])
], ContractRequestModel);
exports.ContractRequestModel = ContractRequestModel;
//# sourceMappingURL=contract-request.model.js.map