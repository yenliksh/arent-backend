"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindMyCardsService = void 0;
const innopay_users_orm_entity_1 = require("../../../../../infrastructure/database/entities/innopay-users.orm-entity");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
let FindMyCardsService = class FindMyCardsService {
    async handle(userId, input) {
        const innopayUserSubQuery = innopay_users_orm_entity_1.InnopayUsersOrmEntity.query().where({ userId });
        const cardsQuery = innopay_users_orm_entity_1.InnopayUsersOrmEntity.relatedQuery('cards').for(innopayUserSubQuery);
        if (input === null || input === void 0 ? void 0 : input.type) {
            cardsQuery.where('appointmentType', input.type);
        }
        const cards = await cardsQuery;
        if (!cards) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('Cards not found'));
        }
        return (0, oxide_ts_1.Ok)(cards);
    }
};
FindMyCardsService = __decorate([
    (0, common_1.Injectable)()
], FindMyCardsService);
exports.FindMyCardsService = FindMyCardsService;
//# sourceMappingURL=find-my-cards.service.js.map