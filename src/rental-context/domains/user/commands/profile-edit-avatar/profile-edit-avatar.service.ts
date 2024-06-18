import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { parseFileKeyFromUrl } from '@libs/utils/file-key.helper';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';

import { ProfileEditAvatarRequest } from './profile-edit-avatar.request.dto';

@Injectable()
export class ProfileEditAvatarService {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(dto: ProfileEditAvatarRequest, userId: UserOrmEntity['id']): Promise<Result<UUID, BadRequestException>> {
    const { avatar } = dto;

    const avatarKey = typeof avatar === 'string' ? parseFileKeyFromUrl(avatar) : null;

    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return Err(new NotFoundException('User ad not found'));
    }

    user.editAvatar(avatarKey);

    const result = await this.userRepository.save(user);

    return Ok(result);
  }
}
