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
exports.ProfileIdentityRejectHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const user_repository_1 = require("../../../../domain-repositories/user/user.repository");
const profile_identity_reject_command_1 = require("./profile-identity-reject.command");
let ProfileIdentityRejectHandler = class ProfileIdentityRejectHandler {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(command) {
        const { userId, rejectReason } = command;
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('User not found'));
        }
        user.rejectIdentity(rejectReason);
        const result = await this.userRepository.save(user);
        return (0, oxide_ts_1.Ok)(result);
    }
};
ProfileIdentityRejectHandler = __decorate([
    (0, cqrs_1.CommandHandler)(profile_identity_reject_command_1.ProfileIdentityRejectCommand),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], ProfileIdentityRejectHandler);
exports.ProfileIdentityRejectHandler = ProfileIdentityRejectHandler;
//# sourceMappingURL=profile-identity-reject.handler.js.map