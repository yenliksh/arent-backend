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
exports.FindMyCardsRequest = void 0;
const types_1 = require("../../domain/types");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let FindMyCardsRequest = class FindMyCardsRequest {
};
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.InnopayAppointmentCardType),
    (0, graphql_1.Field)(() => types_1.InnopayAppointmentCardType, { description: 'choose card type' }),
    __metadata("design:type", String)
], FindMyCardsRequest.prototype, "type", void 0);
FindMyCardsRequest = __decorate([
    (0, graphql_1.InputType)()
], FindMyCardsRequest);
exports.FindMyCardsRequest = FindMyCardsRequest;
//# sourceMappingURL=find-my-cards.request.js.map