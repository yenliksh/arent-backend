import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { BadRequestException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
import { ProfileEditAvatarRequest } from './profile-edit-avatar.request.dto';
export declare class ProfileEditAvatarService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    handle(dto: ProfileEditAvatarRequest, userId: UserOrmEntity['id']): Promise<Result<UUID, BadRequestException>>;
}
