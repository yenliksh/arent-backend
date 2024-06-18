import { generateVerificationToken } from '@libs/utils';
import { VerificationEmailEvent } from '@modules/notifications/services/verification-email/verification-email.event';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CloudCacheStorageService } from '@third-parties/cloud-cache-storage/src';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
import { TokenEmailRecord } from 'src/rental-context/domains/user/types';

@Injectable()
export class ProfileSendVerificationEmailService {
  emailFrom: string;
  tokenExpiresIn: number;

  constructor(
    private readonly cacheStorageService: CloudCacheStorageService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private eventEmitter: EventEmitter2,
  ) {
    this.emailFrom = this.configService.get<string>('ses.emailFrom') as string;
    this.tokenExpiresIn = this.configService.get<number>('ses.tokenExp') as number;
  }

  async handle(userId: string): Promise<Result<string, NotFoundException>> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return Err(new NotFoundException('User not found'));
    }

    const email = user.email.value;

    const token = this.generateVerificationToken(email);

    this.saveTokenWithExp(userId, token, this.tokenExpiresIn);

    this.eventEmitter.emit(
      VerificationEmailEvent.eventName,
      VerificationEmailEvent.create({
        recipientId: user.id,
        token,
      }),
    );

    return Ok(token);
  }

  private generateVerificationToken(email: string): string {
    return generateVerificationToken(email);
  }

  private saveTokenWithExp(userId: string, token: string, tokenExpiresIn: number): TokenEmailRecord {
    const { expDate } = this.cacheStorageService.setValueWithExp(userId, { token }, tokenExpiresIn);

    return {
      token,
      expDate,
    };
  }
}
