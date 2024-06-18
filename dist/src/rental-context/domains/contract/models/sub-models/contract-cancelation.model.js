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
var ContractCancelationModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractCancelationModel = void 0;
const model_base_1 = require("../../../../../libs/ddd/interface-adapters/base-classes/model.base");
const minimal_unit_helper_1 = require("../../../../../libs/utils/minimal-unit.helper");
const graphql_1 = require("@nestjs/graphql");
let ContractCancelationModel = ContractCancelationModel_1 = class ContractCancelationModel extends model_base_1.ModelBase {
    static create(props) {
        const payload = new ContractCancelationModel_1(props);
        payload.contractId = props.contractId;
        payload.cancelationDate = props.cancelationDate;
        payload.checkOutDate = props.checkOutDate;
        payload.refundsAmountToSenderCost = (0, minimal_unit_helper_1.toMinorUnitString)(props.refundsAmountToSenderCost);
        payload.refundsAmountToSenderCurrency = props.refundsAmountToSenderCurrency;
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'ex. 2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231' }),
    __metadata("design:type", String)
], ContractCancelationModel.prototype, "contractId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ContractCancelationModel.prototype, "cancelationDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ContractCancelationModel.prototype, "checkOutDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ContractCancelationModel.prototype, "refundsAmountToSenderCost", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ContractCancelationModel.prototype, "refundsAmountToSenderCurrency", void 0);
ContractCancelationModel = ContractCancelationModel_1 = __decorate([
    (0, graphql_1.ObjectType)()
], ContractCancelationModel);
exports.ContractCancelationModel = ContractCancelationModel;
//# sourceMappingURL=contract-cancelation.model.js.map