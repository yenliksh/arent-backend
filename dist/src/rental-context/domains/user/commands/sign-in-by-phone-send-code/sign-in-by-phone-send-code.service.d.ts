import { ConfigService } from '@nestjs/config';
import { CloudCacheStorageService } from '@third-parties/cloud-cache-storage/src';
import { SimpleNotificationService } from '@third-parties/simple-notification/src';
import { SmsCenterKzService } from '@third-parties/sms-center-kz/src';
import { Result } from 'oxide.ts';
import { SendSmsCodeRestrictionProblem } from 'src/rental-context/domains/user/problems/send-sms-code-rescriction.problem';
import { SignInByPhoneSendCodeRequest } from './sign-in-by-phone-send-code.request.dto';
export declare class SignInByPhoneSendCodeService {
    private readonly configService;
    private readonly cacheStorageService;
    private readonly simpleNotificationService;
    private readonly smsCenterKzService;
    smsCodeExpiresIn: number;
    smsCodeLength: number;
    constructor(configService: ConfigService, cacheStorageService: CloudCacheStorageService, simpleNotificationService: SimpleNotificationService, smsCenterKzService: SmsCenterKzService);
    handle(dto: SignInByPhoneSendCodeRequest): Promise<Result<string | null, SendSmsCodeRestrictionProblem>>;
    private saveSMSCode;
    private getSMScode;
    private checkExpiration;
    private generateSmsCode;
    private sendSmsCodeToPhone;
}
