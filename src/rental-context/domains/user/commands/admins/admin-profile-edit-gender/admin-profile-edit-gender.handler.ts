import { UserRepository } from '@domain-repositories/user/user.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { AdminProfileEditGenderCommand } from './admin-profile-edit-gender.command';

@CommandHandler(AdminProfileEditGenderCommand)
export class AdminProfileEditGenderHandler implements ICommandHandler<AdminProfileEditGenderCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(command: AdminProfileEditGenderCommand): Promise<Result<UUID, HttpException>> {
    const { userId, gender } = command;

    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return Err(new NotFoundException('User not found'));
    }

    user.adminEditGender(gender);

    const result = await this.userRepository.save(user);

    return Ok(result);
  }
}
