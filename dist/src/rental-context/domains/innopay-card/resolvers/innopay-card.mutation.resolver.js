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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InnopayCardMutationGraphqlResolver = void 0;
const user_orm_entity_1 = require("../../../../infrastructure/database/entities/user.orm-entity");
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const guards_1 = require("../../../../infrastructure/guards");
const uuid_value_object_1 = require("../../../../libs/ddd/domain/value-objects/uuid.value-object");
const problem_response_dto_1 = require("../../../../libs/ddd/interface-adapters/dtos/problem.response.dto");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const delete_card_request_dto_1 = require("../commands/delete-card/delete-card.request.dto");
const delete_card_service_1 = require("../commands/delete-card/delete-card.service");
const save_card_start_service_1 = require("../commands/save-card-start/save-card-start.service");
const innopay_card_response_dto_1 = require("../dtos/innopay-card.response.dto");
const save_card_start_response_dto_1 = require("../dtos/save-card-start.response.dto");
let InnopayCardMutationGraphqlResolver = class InnopayCardMutationGraphqlResolver {
    constructor(saveCardStartService, deleteCardService) {
        this.saveCardStartService = saveCardStartService;
        this.deleteCardService = deleteCardService;
    }
    async saveCardStart(iam) {
        return problem_response_dto_1.ProblemResponse.catchProblems(save_card_start_response_dto_1.SaveCardStartResponse, async () => {
            const result = await this.saveCardStartService.handle(new uuid_value_object_1.UUID(iam.id));
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            return save_card_start_response_dto_1.SaveCardStartResponse.create({ ok: result.isOk(), url: result.unwrap() });
        });
    }
    async deleteCard(iam, input) {
        return problem_response_dto_1.ProblemResponse.catchProblems(innopay_card_response_dto_1.InnopayCardResponse, async () => {
            const result = await this.deleteCardService.handle(new uuid_value_object_1.UUID(iam.id), input.cardId);
            if (result.isErr()) {
                throw result.unwrapErr();
            }
            return innopay_card_response_dto_1.InnopayCardResponse.create(result.unwrap());
        });
    }
};
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => save_card_start_response_dto_1.SaveCardStartResponse, {
        name: 'innopay_card__save',
    }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity]),
    __metadata("design:returntype", Promise)
], InnopayCardMutationGraphqlResolver.prototype, "saveCardStart", null);
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => innopay_card_response_dto_1.InnopayCardResponse, {
        name: 'innopay_card__delete',
    }),
    __param(0, (0, iam_decorator_1.IAM)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_orm_entity_1.UserOrmEntity, delete_card_request_dto_1.DeleteCardRequest]),
    __metadata("design:returntype", Promise)
], InnopayCardMutationGraphqlResolver.prototype, "deleteCard", null);
InnopayCardMutationGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [save_card_start_service_1.SaveCardStartService,
        delete_card_service_1.DeleteCardService])
], InnopayCardMutationGraphqlResolver);
exports.InnopayCardMutationGraphqlResolver = InnopayCardMutationGraphqlResolver;
//# sourceMappingURL=innopay-card.mutation.resolver.js.map