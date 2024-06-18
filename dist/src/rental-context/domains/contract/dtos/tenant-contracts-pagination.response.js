"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TenantContractsPaginationResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantContractsPaginationResponse = void 0;
const contract_model_1 = require("../models/contract.model");
const base_cursor_pagination_response_1 = require("../../../../infrastructure/dto/base-cursor-pagination.response");
const graphql_1 = require("@nestjs/graphql");
let TenantContractsPaginationResponse = TenantContractsPaginationResponse_1 = class TenantContractsPaginationResponse extends (0, base_cursor_pagination_response_1.BaseAfterCursorPaginationResponse)(contract_model_1.ContractTenantModel) {
    static create(props) {
        const payload = new TenantContractsPaginationResponse_1();
        payload.data = props.data.map(contract_model_1.ContractTenantModel.create);
        payload.pageInfo = props.pageInfo;
        return payload;
    }
};
TenantContractsPaginationResponse = TenantContractsPaginationResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], TenantContractsPaginationResponse);
exports.TenantContractsPaginationResponse = TenantContractsPaginationResponse;
//# sourceMappingURL=tenant-contracts-pagination.response.js.map