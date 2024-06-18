import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
import { ProfileAddIdentityDocumentRequest } from './profile-add-identity-documents.request.dto';
export declare class ProfileAddIdentityDocumentsService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    handle(dto: ProfileAddIdentityDocumentRequest, userId: UserOrmEntity['id']): Promise<Result<UUID, HttpException>>;
}
