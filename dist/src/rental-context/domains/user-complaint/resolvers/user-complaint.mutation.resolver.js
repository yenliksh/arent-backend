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
exports.UserComplaintGraphqlResolver = void 0;
const iam_decorator_1 = require("../../../../infrastructure/decorators/iam.decorator");
const guards_1 = require("../../../../infrastructure/guards");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const graphql_1 = require("@nestjs/graphql");
const create_user_complaint_command_1 = require("../commands/create-user-complaint/create-user-complaint.command");
const create_user_complaint_request_dto_1 = require("../commands/create-user-complaint/create-user-complaint.request.dto");
const user_complaint_response_dto_1 = require("../dtos/user-complaint.response.dto");
let UserComplaintGraphqlResolver = class UserComplaintGraphqlResolver {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async sendApartmentAdComplaint(userId, input) {
        const result = await this.commandBus.execute(new create_user_complaint_command_1.CreateUserComplaintCommand(userId, input));
        return user_complaint_response_dto_1.UserComplaintResponse.create(result.isOk());
    }
};
__decorate([
    (0, common_1.UseGuards)((0, guards_1.JwtAuthGuard)()),
    (0, graphql_1.Mutation)(() => user_complaint_response_dto_1.UserComplaintResponse, { name: 'user_complaint__send' }),
    __param(0, (0, iam_decorator_1.IAM)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_complaint_request_dto_1.CreateUserComplaintRequest]),
    __metadata("design:returntype", Promise)
], UserComplaintGraphqlResolver.prototype, "sendApartmentAdComplaint", null);
UserComplaintGraphqlResolver = __decorate([
    (0, graphql_1.Resolver)('UserComplaint'),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], UserComplaintGraphqlResolver);
exports.UserComplaintGraphqlResolver = UserComplaintGraphqlResolver;
//# sourceMappingURL=user-complaint.mutation.resolver.js.map