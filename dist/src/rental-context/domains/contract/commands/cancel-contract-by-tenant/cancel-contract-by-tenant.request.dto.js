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
exports.CancelContractByTenantRequest = void 0;
const openapi = require("@nestjs/swagger");
const validators_1 = require("../../../../../infrastructure/validators");
const is_future_date_decorator_1 = require("../../../../../infrastructure/validators/decorators/is-future-date.decorator");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CancelContractByTenantRequest = class CancelContractByTenantRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { contractId: { required: true, type: () => String }, departureDate: { required: false, type: () => String } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CancelContractByTenantRequest.prototype, "contractId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Validate)(validators_1.DateISOValidator),
    (0, is_future_date_decorator_1.IsFutureDate)(),
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'new departure date' }),
    __metadata("design:type", String)
], CancelContractByTenantRequest.prototype, "departureDate", void 0);
CancelContractByTenantRequest = __decorate([
    (0, graphql_1.InputType)()
], CancelContractByTenantRequest);
exports.CancelContractByTenantRequest = CancelContractByTenantRequest;
//# sourceMappingURL=cancel-contract-by-tenant.request.dto.js.map