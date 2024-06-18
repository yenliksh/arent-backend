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
exports.CreateUserComplaintRequest = void 0;
const openapi = require("@nestjs/swagger");
const types_1 = require("../../domain/types");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateUserComplaintRequest = class CreateUserComplaintRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { recipientUserId: { required: true, type: () => String }, cause: { required: true, enum: require("../../domain/types").UserComplaintType, isArray: true }, reason: { required: false, type: () => String } };
    }
};
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsUUID)('4'),
    (0, graphql_1.Field)(() => String, { description: 'recipientUserId' }),
    __metadata("design:type", String)
], CreateUserComplaintRequest.prototype, "recipientUserId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, graphql_1.Field)(() => [types_1.UserComplaintType], {
        description: 'complaintType',
    }),
    __metadata("design:type", Array)
], CreateUserComplaintRequest.prototype, "cause", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'reason' }),
    __metadata("design:type", String)
], CreateUserComplaintRequest.prototype, "reason", void 0);
CreateUserComplaintRequest = __decorate([
    (0, graphql_1.InputType)()
], CreateUserComplaintRequest);
exports.CreateUserComplaintRequest = CreateUserComplaintRequest;
//# sourceMappingURL=create-user-complaint.request.dto.js.map