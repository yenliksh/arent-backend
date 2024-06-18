import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';

import { ProfileEditPersonalInfoRequest } from './profile-edit-personal-info.request.dto';

@Injectable()
export class ProfileEditPersonalInfoService {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(
    dto: ProfileEditPersonalInfoRequest,
    userId: UserOrmEntity['id'],
  ): Promise<Result<UUID, NotFoundException>> {
    const { firstName, lastName, middleName, birthdate, gender } = dto;

    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return Err(new NotFoundException('User not found'));
    }

    if (firstName && lastName) user.editPersonalName(firstName, lastName, middleName);

    if (birthdate) user.editBirthDate(birthdate);

    if (gender) user.editGender(gender);

    const result = await this.userRepository.save(user);

    return Ok(result);
  }
}
