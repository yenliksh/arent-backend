import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs';

import { SMS_CENTER_KZ_OPTIONS_PROVIDER_NAME, SmsCenterKzModuleOptions } from './sms-center-kz.types';

@Injectable()
export class SmsCenterKzService {
  private charset: string;

  constructor(
    @Inject(SMS_CENTER_KZ_OPTIONS_PROVIDER_NAME)
    private readonly options: SmsCenterKzModuleOptions,
    private readonly httpService: HttpService,
  ) {
    this.charset = 'utf-8';
  }

  public async sendSms({ phones, message }: { phones: string[]; message: string }) {
    const urlLinkWithParams = this.urlLinkWithParams({ phones, message });

    await this.httpService
      .get(urlLinkWithParams, {
        headers: {
          'Content-Type': 'text/plain',
        },
      })
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('SMS not working');
        }),
      )
      .toPromise();
  }

  private urlLinkWithParams({ phones, message }: { phones: string[]; message: string }) {
    let urlLink = '';

    if (this.options.link) {
      urlLink += this.options.link;
    }

    if (this.options.login) {
      urlLink += `login=${this.options.login}`;
    }

    if (this.options.password) {
      urlLink += `&psw=${this.options.password}`;
    }

    if (this.options.sender) {
      urlLink += `&sender=${this.options.sender}`;
    }

    if (phones) {
      urlLink += `&phones=${phones.join(',')}`;
    }

    if (message) {
      urlLink += `&mes=${message}`;
    }

    return encodeURI(urlLink);
  }
}
