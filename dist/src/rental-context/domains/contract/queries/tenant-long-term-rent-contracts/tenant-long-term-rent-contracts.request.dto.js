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
exports.TenantLongTermRentContractsRequest = void 0;
const openapi = require("@nestjs/swagger");
const enums_1 = require("../../../../../infrastructure/enums");
const base_cursor_pagination_request_dto_1 = require("../../../../../infrastructure/inputs/base-cursor-pagination.request.dto");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let TenantLongTermRentContractsRequest = class TenantLongTermRentContractsRequest extends base_cursor_pagination_request_dto_1.BaseAfterCursorPaginateRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: true, enum: require("../../../../../infrastructure/enums").ContractRentStatus } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEnum)(enums_1.ContractRentStatus),
    (0, graphql_1.Field)(() => enums_1.ContractRentStatus),
    __metadata("design:type", String)
], TenantLongTermRentContractsRequest.prototype, "type", void 0);
TenantLongTermRentContractsRequest = __decorate([
    (0, graphql_1.InputType)()
], TenantLongTermRentContractsRequest);
exports.TenantLongTermRentContractsRequest = TenantLongTermRentContractsRequest;
//# sourceMappingURL=tenant-long-term-rent-contracts.request.dto.js.map