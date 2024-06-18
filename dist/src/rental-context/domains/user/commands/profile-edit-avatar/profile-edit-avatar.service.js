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
exports.ProfileEditAvatarService = void 0;
const file_key_helper_1 = require("../../../../../libs/utils/file-key.helper");
const common_1 = require("@nestjs/common");
const oxide_ts_1 = require("oxide.ts");
const user_repository_1 = require("../../../../domain-repositories/user/user.repository");
let ProfileEditAvatarService = class ProfileEditAvatarService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async handle(dto, userId) {
        const { avatar } = dto;
        const avatarKey = typeof avatar === 'string' ? (0, file_key_helper_1.parseFileKeyFromUrl)(avatar) : null;
        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            return (0, oxide_ts_1.Err)(new common_1.NotFoundException('User ad not found'));
        }
        user.editAvatar(avatarKey);
        const result = await this.userRepository.save(user);
        return (0, oxide_ts_1.Ok)(result);
    }
};
ProfileEditAvatarService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], ProfileEditAvatarService);
exports.ProfileEditAvatarService = ProfileEditAvatarService;
//# sourceMappingURL=profile-edit-avatar.service.js.map