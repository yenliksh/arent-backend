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
exports.CreateUserComplaintHandler = void 0;
const user_complaint_repository_1 = require("../../../../domain-repositories/user-complaint/user-complaint.repository");
const user_complaint_entity_1 = require("../../domain/entities/user-complaint.entity");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const create_user_complaint_command_1 = require("./create-user-complaint.command");
let CreateUserComplaintHandler = class CreateUserComplaintHandler {
    constructor(userComplaintRepository) {
        this.userComplaintRepository = userComplaintRepository;
    }
    async execute(command) {
        const { input, senderUserId } = command;
        const domainEntity = user_complaint_entity_1.UserComplaintEntity.create({ ...input, senderUserId });
        const result = await this.userComplaintRepository.save(domainEntity);
        return (0, oxide_ts_1.Ok)(result);
    }
};
CreateUserComplaintHandler = __decorate([
    (0, cqrs_1.CommandHandler)(create_user_complaint_command_1.CreateUserComplaintCommand),
    __metadata("design:paramtypes", [user_complaint_repository_1.UserComplaintRepository])
], CreateUserComplaintHandler);
exports.CreateUserComplaintHandler = CreateUserComplaintHandler;
//# sourceMappingURL=create-user-complaint.handler.js.map