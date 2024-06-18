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
exports.SignInByPhoneConfirmCodeRequest = void 0;
const openapi = require("@nestjs/swagger");
const validators_1 = require("../../../../../infrastructure/validators");
const smscode_validator_1 = require("../../../../../infrastructure/validators/smscode.validator");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let SignInByPhoneConfirmCodeRequest = class SignInByPhoneConfirmCodeRequest {
    static _OPENAPI_METADATA_FACTORY() {
        return { phone: { required: true, type: () => String }, smscode: { required: true, type: () => String } };
    }
};
__decorate([
    (0, class_validator_1.Validate)(validators_1.PhoneValidator),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SignInByPhoneConfirmCodeRequest.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.Validate)(smscode_validator_1.SmscodeValidator),
    __metadata("design:type", String)
], SignInByPhoneConfirmCodeRequest.prototype, "smscode", void 0);
SignInByPhoneConfirmCodeRequest = __decorate([
    (0, graphql_1.InputType)()
], SignInByPhoneConfirmCodeRequest);
exports.SignInByPhoneConfirmCodeRequest = SignInByPhoneConfirmCodeRequest;
//# sourceMappingURL=sign-in-by-phone-confirm-code.request.dto.js.map