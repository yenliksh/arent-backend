import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';

import { ProfileIdentityApproveCommand } from './profile-identity-approve.command';

@CommandHandler(ProfileIdentityApproveCommand)
export class ProfileIdentityApproveHandler implements ICommandHandler<ProfileIdentityApproveCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(command: ProfileIdentityApproveCommand): Promise<Result<UUID, HttpException>> {
    const { userId } = command;

    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return Err(new NotFoundException('User not found'));
    }

    user.approveIdentity();

    const result = await this.userRepository.save(user);

    return Ok(result);
  }
}
