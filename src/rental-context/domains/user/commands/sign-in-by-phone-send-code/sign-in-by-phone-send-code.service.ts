import { generateSmsCode } from '@libs/utils';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudCacheStorageService } from '@third-parties/cloud-cache-storage/src';
import { SimpleNotificationService } from '@third-parties/simple-notification/src';
import { SmsCenterKzService } from '@third-parties/sms-center-kz/src';
import { findPhoneNumbersInText } from 'libphonenumber-js';
import * as moment from 'moment';
import { Err, Ok, Result } from 'oxide.ts';
import { SendSmsCodeRestrictionProblem } from 'src/rental-context/domains/user/problems/send-sms-code-rescriction.problem';
import { SMSCodeRecord } from 'src/rental-context/domains/user/types';

import { SignInByPhoneSendCodeRequest } from './sign-in-by-phone-send-code.request.dto';

@Injectable()
export class SignInByPhoneSendCodeService {
  smsCodeExpiresIn: number;
  smsCodeLength: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly cacheStorageService: CloudCacheStorageService,
    private readonly simpleNotificationService: SimpleNotificationService,
    private readonly smsCenterKzService: SmsCenterKzService,
  ) {
    this.smsCodeExpiresIn = configService.get<number>('smsCode.expiresInSeconds') as number;
    this.smsCodeLength = configService.get<number>('smsCode.codeLength') as number;
  }

  async handle(dto: SignInByPhoneSendCodeRequest): Promise<Result<string | null, SendSmsCodeRestrictionProblem>> {
    const { phone } = dto;

    let codeRecord: SMSCodeRecord | null = await this.getSMScode(phone);

    const expirationResult = this.checkExpiration(codeRecord);

    if (expirationResult.isErr()) {
      return expirationResult;
    }

    let smscode: string | null = this.generateSmsCode();

    codeRecord = this.saveSMSCode(smscode, phone);

    await this.sendSmsCodeToPhone(phone, smscode);

    const isProduction = this.configService.get<string>('nodeEnv') === 'production';

    if (isProduction) {
      smscode = null;
    }

    return Ok(smscode);
  }

  private saveSMSCode(smscode: string, phone: string): SMSCodeRecord {
    const { expDate } = this.cacheStorageService.setValueWithExp(phone, { smscode }, this.smsCodeExpiresIn);

    return {
      smscode,
      expDate,
    };
  }

  private getSMScode(phone: string): Promise<SMSCodeRecord | null> {
    return this.cacheStorageService.getValue(phone);
  }

  private checkExpiration(codeRecord: SMSCodeRecord | null): Result<boolean, SendSmsCodeRestrictionProblem> {
    if (!codeRecord) {
      return Ok(true);
    }

    const dateDiff = moment.duration(moment(codeRecord.expDate).diff(moment()));
    return Err(new SendSmsCodeRestrictionProblem(dateDiff.get('seconds')));
  }

  private generateSmsCode(): string {
    return generateSmsCode(this.smsCodeLength).toString();
  }

  private async sendSmsCodeToPhone(phone: string, smscode: string) {
    const isProduction = this.configService.get<string>('nodeEnv') === 'production';
    const parsed = findPhoneNumbersInText(phone, 'KZ');
    const message = `Введите ${smscode} для авторизации в livin.kz`;

    if (isProduction) {
      if (parsed[0]?.number?.country === 'KZ') {
        await this.smsCenterKzService.sendSms({
          phones: [phone],
          message,
        });
      } else {
        await this.simpleNotificationService.publish({
          phoneNumber: phone,
          message,
        });
      }
    }
  }
}
