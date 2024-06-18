import { UserRepository } from '@domain-repositories/user/user.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { AdminProfileEditBirthdateCommand } from './admin-profile-edit-birthdate.command';

@CommandHandler(AdminProfileEditBirthdateCommand)
export class AdminProfileEditBirthdateHandler implements ICommandHandler<AdminProfileEditBirthdateCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(command: AdminProfileEditBirthdateCommand): Promise<Result<UUID, HttpException>> {
    const { userId, birthdate } = command;

    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return Err(new NotFoundException('User not found'));
    }

    user.adminEditBirthDate(birthdate);

    const result = await this.userRepository.save(user);

    return Ok(result);
  }
}
