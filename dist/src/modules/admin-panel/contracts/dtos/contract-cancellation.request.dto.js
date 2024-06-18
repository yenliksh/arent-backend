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
exports.ContractCancellationRequest = exports.AdminCancelationModeRequest = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../../../rental-context/domains/contract/domain/types");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AdminCancelationModeRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { force: { required: true, type: () => Boolean }, validExcuse: { required: true, type: () => Boolean } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'If need force cancellation (for long-term only)', type: Boolean }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminCancelationModeRequest.prototype, "force", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AdminCancelationModeRequest.prototype, "validExcuse", void 0);
exports.AdminCancelationModeRequest = AdminCancelationModeRequest;
class ContractCancellationRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { cancellationMeta: { required: false, type: () => require("./contract-cancellation.request.dto").AdminCancelationModeRequest }, requestingUserRole: { required: true, enum: require("../../../../rental-context/domains/contract/domain/types").CancellationTrigger } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: AdminCancelationModeRequest }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AdminCancelationModeRequest)
], ContractCancellationRequest.prototype, "cancellationMeta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User role who request cancellation', enum: types_1.CancellationTrigger }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEnum)(types_1.CancellationTrigger),
    __metadata("design:type", String)
], ContractCancellationRequest.prototype, "requestingUserRole", void 0);
exports.ContractCancellationRequest = ContractCancellationRequest;
//# sourceMappingURL=contract-cancellation.request.dto.js.map