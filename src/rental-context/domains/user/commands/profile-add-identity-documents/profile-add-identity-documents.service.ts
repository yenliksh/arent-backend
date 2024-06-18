import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';

import { ProfileAddIdentityDocumentRequest } from './profile-add-identity-documents.request.dto';

@Injectable()
export class ProfileAddIdentityDocumentsService {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(
    dto: ProfileAddIdentityDocumentRequest,
    userId: UserOrmEntity['id'],
  ): Promise<Result<UUID, HttpException>> {
    const { identityDocuments } = dto;

    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return Err(new NotFoundException('User ad not found'));
    }

    user.addIdentityDocuments(identityDocuments);

    const result = await this.userRepository.save(user);

    return Ok(result);
  }
}
