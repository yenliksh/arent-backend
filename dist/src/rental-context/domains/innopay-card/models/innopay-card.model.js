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
var InnopayCardModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayCardModel = void 0;
const innopay_card_orm_entity_1 = require("../../../../infrastructure/database/entities/innopay-card.orm-entity");
const model_base_1 = require("../../../../libs/ddd/interface-adapters/base-classes/model.base");
const graphql_1 = require("@nestjs/graphql");
const types_1 = require("../domain/types");
let InnopayCardModel = InnopayCardModel_1 = class InnopayCardModel extends model_base_1.ModelBase {
    constructor(card) {
        super(card);
    }
    static create(props) {
        const payload = new InnopayCardModel_1(props);
        const assignObject = {
            cardType: props.cardType,
            cnpCardId: props.cnpCardId,
            panMasked: props.panMasked,
            appointmentType: props.appointmentType,
        };
        Object.assign(payload, assignObject);
        return payload;
    }
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], InnopayCardModel.prototype, "cnpCardId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], InnopayCardModel.prototype, "panMasked", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.InnopayCardType),
    __metadata("design:type", String)
], InnopayCardModel.prototype, "cardType", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.InnopayAppointmentCardType),
    __metadata("design:type", String)
], InnopayCardModel.prototype, "appointmentType", void 0);
InnopayCardModel = InnopayCardModel_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [innopay_card_orm_entity_1.InnopayCardOrmEntity])
], InnopayCardModel);
exports.InnopayCardModel = InnopayCardModel;
//# sourceMappingURL=innopay-card.model.js.map