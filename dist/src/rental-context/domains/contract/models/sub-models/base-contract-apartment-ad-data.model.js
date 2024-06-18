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
var BaseContractApartmentAdDataModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseContractApartmentAdDataModel = void 0;
const graphql_1 = require("@nestjs/graphql");
const base_contract_address_data_model_1 = require("./base-contract-address-data.model");
let BaseContractApartmentAdDataModel = BaseContractApartmentAdDataModel_1 = class BaseContractApartmentAdDataModel {
    static create(props) {
        const payload = new BaseContractApartmentAdDataModel_1();
        const assignObject = {
            title: props.title,
            address: base_contract_address_data_model_1.BaseContractAddressDataModel.create(props.address),
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], BaseContractApartmentAdDataModel.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => base_contract_address_data_model_1.BaseContractAddressDataModel),
    __metadata("design:type", base_contract_address_data_model_1.BaseContractAddressDataModel)
], BaseContractApartmentAdDataModel.prototype, "address", void 0);
BaseContractApartmentAdDataModel = BaseContractApartmentAdDataModel_1 = __decorate([
    (0, graphql_1.ObjectType)()
], BaseContractApartmentAdDataModel);
exports.BaseContractApartmentAdDataModel = BaseContractApartmentAdDataModel;
//# sourceMappingURL=base-contract-apartment-ad-data.model.js.map