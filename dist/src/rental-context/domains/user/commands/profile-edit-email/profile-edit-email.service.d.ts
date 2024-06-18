import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotFoundException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
import { EmailAlreadyUsedProblem } from 'src/rental-context/domains/user/problems/email-already-used.problem';
import { ProfileEditEmailRequest } from './profile-edit-email.request.dto';
export declare class ProfileEditEmailService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    handle(dto: ProfileEditEmailRequest, userId: UserOrmEntity['id']): Promise<Result<UUID, EmailAlreadyUsedProblem | NotFoundException>>;
}
