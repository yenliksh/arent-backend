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
var InnopayPageUrlSubscriptionResponse_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayPageUrlSubscriptionResponse = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
let InnopayPageUrlSubscriptionResponse = InnopayPageUrlSubscriptionResponse_1 = class InnopayPageUrlSubscriptionResponse {
    static create(url, startUrlDate, refs) {
        const payload = new InnopayPageUrlSubscriptionResponse_1();
        payload.url = url;
        payload.startUrlDate = startUrlDate;
        payload.contractId = refs.contractId;
        return payload;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { url: { required: true, type: () => String }, startUrlDate: { required: true, type: () => String }, contractId: { required: false, type: () => String } };
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], InnopayPageUrlSubscriptionResponse.prototype, "url", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], InnopayPageUrlSubscriptionResponse.prototype, "startUrlDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], InnopayPageUrlSubscriptionResponse.prototype, "contractId", void 0);
InnopayPageUrlSubscriptionResponse = InnopayPageUrlSubscriptionResponse_1 = __decorate([
    (0, graphql_1.ObjectType)()
], InnopayPageUrlSubscriptionResponse);
exports.InnopayPageUrlSubscriptionResponse = InnopayPageUrlSubscriptionResponse;
//# sourceMappingURL=innopay-page-url.subscription.response.dto.js.map