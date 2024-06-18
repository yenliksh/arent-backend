import { UserEntity } from '@domains/user/domain/entities/user.entity';
import { EmailVO } from '@domains/user/domain/value-objects';
import { NameVO } from '@domains/user/domain/value-objects/name.value-object';
import { UndefinedReturnGoogleOauthProblem } from '@domains/user/problems/undefined-return-google-oauth.problem';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { AuthNService } from '@modules/auth/services/authn.service';
import { TokenType } from '@modules/auth/types';
import { RequireIdentityDocumentEvent } from '@modules/notifications/services/require-identity-document/require-identity-document.event';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Auth, google } from 'googleapis';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';

import { SignInByGoogleRequest } from './sign-in-by-google.request.dto';

type GoogleSignResult = {
  token: string;
  userId?: UUID;
  refreshToken?: string;
};

@Injectable()
export class SignInByGoogleService {
  private readonly oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly authService: AuthNService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private eventEmitter: EventEmitter2,
  ) {
    const clientID = this.configService.get<string>('googleAuth.clientId');
    const clientSecret = this.configService.get<string>('googleAuth.secret');

    this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
  }

  async handle(dto: SignInByGoogleRequest): Promise<Result<GoogleSignResult, UndefinedReturnGoogleOauthProblem>> {
    const { accessToken } = dto;
    const tokenInfo = await this.oauthClient.getTokenInfo(accessToken);

    if (!tokenInfo || !tokenInfo.email) {
      return Err(new UndefinedReturnGoogleOauthProblem());
    }

    const user = await this.userRepository.findOneByEmail(tokenInfo.email);
    const userData = await this.getUserData(accessToken);

    if (!userData || !userData.email || !userData.given_name) {
      return Err(new UndefinedReturnGoogleOauthProblem());
    }

    if (!user) {
      const user = UserEntity.create({
        birthDate: undefined,
        email: new EmailVO(userData.email),
        isEmailVerified: true,
        isPhoneApproved: false,
        firstName: new NameVO(userData.given_name),
        lastName: new NameVO(userData.family_name ? userData.family_name : ''),
      });

      await this.userRepository.save(user);

      this.eventEmitter.emit(
        RequireIdentityDocumentEvent.eventName,
        RequireIdentityDocumentEvent.create({ recipientId: user.id }),
      );

      const token = await this.authService.createToken(TokenType.USER, { id: user.id.value, email: tokenInfo.email });
      const refreshToken = await this.authService.createToken(TokenType.REFRESH, {
        id: user.id.value,
        email: tokenInfo.email,
      });

      return Ok({ userId: user.id, token, refreshToken });
    }

    const token = await this.authService.createToken(TokenType.USER, { id: user.id.value, email: tokenInfo.email });
    const refreshToken = await this.authService.createToken(TokenType.REFRESH, {
      id: user.id.value,
      email: tokenInfo.email,
    });

    return Ok({
      userId: user.id,
      token,
      refreshToken,
    });
  }

  private async getUserData(token: string) {
    const userInfoClient = google.oauth2('v2').userinfo;

    this.oauthClient.setCredentials({
      access_token: token,
    });

    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });

    return userInfoResponse.data;
  }
}
