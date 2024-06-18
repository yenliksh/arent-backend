import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { NotFoundException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
export declare class ProfileDeleteGuarantorService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    handle(userId: UserOrmEntity['id']): Promise<Result<UUID, NotFoundException>>;
}
