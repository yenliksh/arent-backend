import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotFoundException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
import { ProfileEditBirthdateRequest } from './profile-edit-birthdate.request.dto';
export declare class ProfileEditBirthdateService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    handle(dto: ProfileEditBirthdateRequest, userId: UserOrmEntity['id']): Promise<Result<UUID, NotFoundException>>;
}
