import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { decodeVerificationToken } from '@libs/utils';
import { HttpException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CloudCacheStorageService } from '@third-parties/cloud-cache-storage/src';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
import { TokenEmailRecord } from 'src/rental-context/domains/user/types';

@Injectable()
export class ProfileConfirmVerificationEmailService {
  constructor(
    private readonly cacheStorageService: CloudCacheStorageService,
    private readonly userRepository: UserRepository,
  ) {}

  async handle(userId: string, inputToken: string): Promise<Result<UUID, HttpException>> {
    const tokenRecord = await this.getToken(userId);

    if (!tokenRecord || !tokenRecord.token) {
      return Err(new NotFoundException('Token not found'));
    }

    const email = decodeVerificationToken(inputToken);

    const decodeEmail = decodeVerificationToken(tokenRecord.token);

    if (email !== decodeEmail) {
      return Err(new UnprocessableEntityException('Invalid email'));
    }

    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return Err(new NotFoundException('User ad not found'));
    }

    user.approveEmail(email);

    const result = await this.userRepository.save(user);

    await this.deleteToken(userId);

    return Ok(result);
  }

  private getToken(userId: string): Promise<TokenEmailRecord | null> {
    return this.cacheStorageService.getValue(userId);
  }

  private deleteToken(userId: string) {
    return this.cacheStorageService.deleteValue(userId);
  }
}
