import { DateISOVO } from '@libs/ddd/domain/value-objects/iso-date.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { AuthNService } from '@modules/auth/services/authn.service';
import { TokenType } from '@modules/auth/types';
import { RequireIdentityDocumentEvent } from '@modules/notifications/services/require-identity-document/require-identity-document.event';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
import { UserEntity } from 'src/rental-context/domains/user/domain/entities/user.entity';
import { EmailVO, PhoneVO } from 'src/rental-context/domains/user/domain/value-objects';
import { NameVO } from 'src/rental-context/domains/user/domain/value-objects/name.value-object';
import { EmailAlreadyUsedProblem } from 'src/rental-context/domains/user/problems/email-already-used.problem';

import { SignUpByPhoneCreateUserRequest } from './sign-up-by-phone-create-create-user.request.dto';

type CreateUserResult = {
  userId: UUID;
  token: string;
  refreshToken: string;
};

@Injectable()
export class SignUpByPhoneCreateUserService {
  constructor(
    private readonly authService: AuthNService,
    private readonly userRepository: UserRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  async handle(
    dto: SignUpByPhoneCreateUserRequest,
    phone: string,
  ): Promise<Result<CreateUserResult, UnprocessableEntityException | EmailAlreadyUsedProblem>> {
    const { email, firstName, lastName, birthDate } = dto;

    const existUserWithPhone = await this.userRepository.existsByPhone(phone);

    if (existUserWithPhone) {
      return Err(new UnprocessableEntityException('User already registered'));
    }

    const existUserWithEmail = await this.userRepository.existsByEmail(email);

    if (existUserWithEmail) {
      return Err(new EmailAlreadyUsedProblem());
    }

    const user = UserEntity.create({
      email: new EmailVO(email),
      isEmailVerified: false,
      phone: new PhoneVO(phone),
      firstName: new NameVO(firstName),
      lastName: new NameVO(lastName),
      birthDate: new DateISOVO(birthDate),
      isPhoneApproved: true,
    });

    await this.userRepository.save(user);

    const token = await this.authService.createToken(TokenType.USER, { id: user.id.value, phone });
    const refreshToken = await this.authService.createToken(TokenType.REFRESH, { id: user.id.value, phone });

    this.eventEmitter.emit(
      RequireIdentityDocumentEvent.eventName,
      RequireIdentityDocumentEvent.create({ recipientId: user.id }),
    );

    return Ok({ userId: user.id, token, refreshToken });
  }
}
