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
exports.SendContractOfferRequest = void 0;
const openapi = require("@nestjs/swagger");
const validators_1 = require("../../../../../infrastructure/validators");
const is_future_date_decorator_1 = require("../../../../../infrastructure/validators/decorators/is-future-date.decorator");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let SendContractOfferRequest = class SendContractOfferRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { chatId: { required: true, type: () => String }, arrivalDate: { required: false, type: () => String }, allowedWithPets: { required: true, type: () => Boolean }, allowedWithChildren: { required: true, type: () => Boolean }, allowedToSmoke: { required: true, type: () => Boolean }, allowedToHangingOut: { required: true, type: () => Boolean } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SendContractOfferRequest.prototype, "chatId", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((obj) => obj.arrivalDate),
    (0, class_validator_1.IsDefined)(),
    (0, is_future_date_decorator_1.IsFutureDate)(),
    (0, class_validator_1.Validate)(validators_1.DateISOValidator),
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'only for short term rent period' }),
    __metadata("design:type", String)
], SendContractOfferRequest.prototype, "arrivalDate", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], SendContractOfferRequest.prototype, "allowedWithPets", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], SendContractOfferRequest.prototype, "allowedWithChildren", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], SendContractOfferRequest.prototype, "allowedToSmoke", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], SendContractOfferRequest.prototype, "allowedToHangingOut", void 0);
SendContractOfferRequest = __decorate([
    (0, graphql_1.InputType)()
], SendContractOfferRequest);
exports.SendContractOfferRequest = SendContractOfferRequest;
//# sourceMappingURL=send-contract-offer.request.dto.js.map