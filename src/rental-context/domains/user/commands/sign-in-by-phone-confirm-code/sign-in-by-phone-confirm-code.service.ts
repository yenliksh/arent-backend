import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { AuthNService } from '@modules/auth/services/authn.service';
import { TokenType } from '@modules/auth/types';
import { Injectable } from '@nestjs/common';
import { CloudCacheStorageService } from '@third-parties/cloud-cache-storage/src';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
import { InvalidVerificationPhoneCodeProblem } from 'src/rental-context/domains/user/problems/invalid-verification-phone-code.problem';
import { SMSCodeRecord } from 'src/rental-context/domains/user/types';

import { SignInByPhoneConfirmCodeRequest } from './sign-in-by-phone-confirm-code.request.dto';

type ConfirmCodeResult = {
  token: string;
  userId?: UUID;
  refreshToken?: string;
};

@Injectable()
export class SignInByPhoneConfirmCodeService {
  constructor(
    private readonly authService: AuthNService,
    private readonly cacheStorageService: CloudCacheStorageService,
    private readonly userRepository: UserRepository,
  ) {}

  async handle(
    dto: SignInByPhoneConfirmCodeRequest,
  ): Promise<Result<ConfirmCodeResult, InvalidVerificationPhoneCodeProblem>> {
    const { phone, smscode } = dto;

    const codeRecord = await this.getSMScode(phone);

    if (!codeRecord || codeRecord.smscode !== smscode) {
      return Err(new InvalidVerificationPhoneCodeProblem());
    }

    await this.deleteSMScode(phone);

    const user = await this.userRepository.findOneByPhone(phone);

    if (!user) {
      const signUpToken = await this.authService.createToken(TokenType.SIGN_UP, { phone });

      return Ok({
        token: signUpToken,
        userId: undefined,
        refreshToken: undefined,
      });
    }

    const token = await this.authService.createToken(TokenType.USER, { id: user.id.value, phone });
    const refreshToken = await this.authService.createToken(TokenType.REFRESH, { id: user.id.value, phone });

    return Ok({
      userId: user.id,
      token,
      refreshToken,
    });
  }

  private getSMScode(phone: string): Promise<SMSCodeRecord | null> {
    return this.cacheStorageService.getValue(phone);
  }

  private deleteSMScode(phone: string): Promise<boolean> {
    return this.cacheStorageService.deleteValue(phone);
  }
}
