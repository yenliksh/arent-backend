import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';

import { ProfileIdentityRejectCommand } from './profile-identity-reject.command';

@CommandHandler(ProfileIdentityRejectCommand)
export class ProfileIdentityRejectHandler implements ICommandHandler<ProfileIdentityRejectCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(command: ProfileIdentityRejectCommand): Promise<Result<UUID, HttpException>> {
    const { userId, rejectReason } = command;

    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return Err(new NotFoundException('User not found'));
    }

    user.rejectIdentity(rejectReason);

    const result = await this.userRepository.save(user);

    return Ok(result);
  }
}
