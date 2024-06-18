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
exports.AdminViewedUserComplaintHandler = void 0;
const user_complaint_repository_1 = require("../../../../domain-repositories/user-complaint/user-complaint.repository");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const admin_set_viewed_user_complaint_command_1 = require("./admin-set-viewed-user-complaint.command");
let AdminViewedUserComplaintHandler = class AdminViewedUserComplaintHandler {
    constructor(userComplaintRepository) {
        this.userComplaintRepository = userComplaintRepository;
    }
    async execute(command) {
        const { userComplaintId } = command;
        const userComplaint = await this.userComplaintRepository.findOneById(userComplaintId);
        if (!userComplaint) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('UserComplaint not found'));
        }
        userComplaint.adminViewed();
        const result = await this.userComplaintRepository.save(userComplaint);
        return (0, oxide_ts_1.Ok)(result);
    }
};
AdminViewedUserComplaintHandler = __decorate([
    (0, cqrs_1.CommandHandler)(admin_set_viewed_user_complaint_command_1.AdminSetViewedUserComplaintCommand),
    __metadata("design:paramtypes", [user_complaint_repository_1.UserComplaintRepository])
], AdminViewedUserComplaintHandler);
exports.AdminViewedUserComplaintHandler = AdminViewedUserComplaintHandler;
//# sourceMappingURL=admin-set-viewed-user-complaint.handler.js.map