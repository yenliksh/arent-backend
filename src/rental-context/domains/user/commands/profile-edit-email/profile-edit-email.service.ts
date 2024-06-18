import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
import { EmailAlreadyUsedProblem } from 'src/rental-context/domains/user/problems/email-already-used.problem';

import { ProfileEditEmailRequest } from './profile-edit-email.request.dto';

@Injectable()
export class ProfileEditEmailService {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(
    dto: ProfileEditEmailRequest,
    userId: UserOrmEntity['id'],
  ): Promise<Result<UUID, EmailAlreadyUsedProblem | NotFoundException>> {
    const { email } = dto;

    const userAlreadyUsedEmail = await this.userRepository.findOneByEmail(email);

    if (userAlreadyUsedEmail) {
      return userAlreadyUsedEmail.id.value === userId
        ? Ok(userAlreadyUsedEmail.id)
        : Err(new EmailAlreadyUsedProblem());
    }

    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return Err(new NotFoundException('User not found'));
    }

    user.editEmail(email);

    const result = await this.userRepository.save(user);

    return Ok(result);
  }
}
