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
exports.AdminProfileEditNameHandler = void 0;
const user_repository_1 = require("../../../../../domain-repositories/user/user.repository");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const oxide_ts_1 = require("oxide.ts");
const admin_profile_edit_name_command_1 = require("./admin-profile-edit-name.command");
let AdminProfileEditNameHandler = class AdminProfileEditNameHandler {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(command) {
        const { userId, firstName, lastName, middleName } = command;
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('User not found'));
        }
        user.adminEditPersonalName(firstName, lastName, middleName);
        const result = await this.userRepository.save(user);
        return (0, oxide_ts_1.Ok)(result);
    }
};
AdminProfileEditNameHandler = __decorate([
    (0, cqrs_1.CommandHandler)(admin_profile_edit_name_command_1.AdminProfileEditNameCommand),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], AdminProfileEditNameHandler);
exports.AdminProfileEditNameHandler = AdminProfileEditNameHandler;
//# sourceMappingURL=admin-profile-edit-name.handler.js.map