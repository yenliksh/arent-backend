"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ContractRequestPaginationResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRequestPaginationResponse = void 0;
const base_cursor_pagination_response_1 = require("../../../../infrastructure/dto/base-cursor-pagination.response");
const graphql_1 = require("@nestjs/graphql");
const contract_request_model_1 = require("../models/contract-request.model");
let ContractRequestPaginationResponse = ContractRequestPaginationResponse_1 = class ContractRequestPaginationResponse extends (0, base_cursor_pagination_response_1.BaseAfterCursorPaginationResponse)(contract_request_model_1.ContractRequestModel) {
};
ContractRequestPaginationResponse.create = (props) => {
    const payload = new ContractRequestPaginationResponse_1();
    payload.data = props.data.map(contract_request_model_1.ContractRequestModel.create);
    payload.pageInfo = props.pageInfo;
    return payload;
};
ContractRequestPaginationResponse = ContractRequestPaginationResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], ContractRequestPaginationResponse);
exports.ContractRequestPaginationResponse = ContractRequestPaginationResponse;
//# sourceMappingURL=contract-request-pagination.response.js.map