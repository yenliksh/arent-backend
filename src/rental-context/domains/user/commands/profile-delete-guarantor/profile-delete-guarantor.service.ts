import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';

@Injectable()
export class ProfileDeleteGuarantorService {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(userId: UserOrmEntity['id']): Promise<Result<UUID, NotFoundException>> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return Err(new NotFoundException('User not found'));
    }

    user.deleteGuarantor();

    const result = await this.userRepository.save(user);

    return Ok(result);
  }
}
