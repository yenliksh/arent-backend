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
exports.ContractTemporaryInstantConcludeRequest = void 0;
const send_request_request_dto_1 = require("../../../contract-request/commands/send-request/send-request.request.dto");
const enums_1 = require("../../../../../infrastructure/enums");
const validators_1 = require("../../../../../infrastructure/validators");
const is_date_before_decorator_1 = require("../../../../../infrastructure/validators/decorators/is-date-before.decorator");
const is_future_date_decorator_1 = require("../../../../../infrastructure/validators/decorators/is-future-date.decorator");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let ContractTemporaryInstantConcludeRequest = class ContractTemporaryInstantConcludeRequest {
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ContractTemporaryInstantConcludeRequest.prototype, "apartmentAdId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Validate)(validators_1.DateISOValidator),
    (0, is_date_before_decorator_1.IsDateBefore)('departureDate'),
    (0, is_future_date_decorator_1.IsFutureDate)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ContractTemporaryInstantConcludeRequest.prototype, "arrivalDate", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Validate)(validators_1.DateISOValidator),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ContractTemporaryInstantConcludeRequest.prototype, "departureDate", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => send_request_request_dto_1.GuestsInput),
    (0, graphql_1.Field)(() => send_request_request_dto_1.GuestsInput),
    __metadata("design:type", send_request_request_dto_1.GuestsInput)
], ContractTemporaryInstantConcludeRequest.prototype, "guests", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContractTemporaryInstantConcludeRequest.prototype, "comment", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEnum)(enums_1.ShortTermRentPaymentType),
    (0, graphql_1.Field)(() => enums_1.ShortTermRentPaymentType),
    __metadata("design:type", String)
], ContractTemporaryInstantConcludeRequest.prototype, "rentPaymentType", void 0);
ContractTemporaryInstantConcludeRequest = __decorate([
    (0, graphql_1.InputType)()
], ContractTemporaryInstantConcludeRequest);
exports.ContractTemporaryInstantConcludeRequest = ContractTemporaryInstantConcludeRequest;
//# sourceMappingURL=contract-temporary-instant-conclude.request.js.map