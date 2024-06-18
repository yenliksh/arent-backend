import { NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CloudCacheStorageService } from '@third-parties/cloud-cache-storage/src';
import { Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
export declare class ProfileSendVerificationEmailService {
    private readonly cacheStorageService;
    private readonly configService;
    private readonly userRepository;
    private eventEmitter;
    emailFrom: string;
    tokenExpiresIn: number;
    constructor(cacheStorageService: CloudCacheStorageService, configService: ConfigService, userRepository: UserRepository, eventEmitter: EventEmitter2);
    handle(userId: string): Promise<Result<string, NotFoundException>>;
    private generateVerificationToken;
    private saveTokenWithExp;
}
