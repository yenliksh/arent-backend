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
var CardMetaModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardMetaModel = void 0;
const enums_1 = require("../../../../../infrastructure/enums");
const graphql_1 = require("@nestjs/graphql");
let CardMetaModel = CardMetaModel_1 = class CardMetaModel {
    static create(cardMeta) {
        const payload = new CardMetaModel_1();
        Object.assign(payload, cardMeta);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CardMetaModel.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.PaymentMethod),
    __metadata("design:type", String)
], CardMetaModel.prototype, "paymentMethod", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CardMetaModel.prototype, "cardType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CardMetaModel.prototype, "panMasked", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CardMetaModel.prototype, "cardHolder", void 0);
CardMetaModel = CardMetaModel_1 = __decorate([
    (0, graphql_1.ObjectType)()
], CardMetaModel);
exports.CardMetaModel = CardMetaModel;
//# sourceMappingURL=card-meta.model.js.map