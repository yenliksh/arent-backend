import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { CloudCacheStorageService } from '@third-parties/cloud-cache-storage/src';
import { Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
export declare class ProfileConfirmVerificationEmailService {
    private readonly cacheStorageService;
    private readonly userRepository;
    constructor(cacheStorageService: CloudCacheStorageService, userRepository: UserRepository);
    handle(userId: string, inputToken: string): Promise<Result<UUID, HttpException>>;
    private getToken;
    private deleteToken;
}
