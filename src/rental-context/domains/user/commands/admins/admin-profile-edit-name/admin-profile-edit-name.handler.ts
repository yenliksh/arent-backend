import { UserRepository } from '@domain-repositories/user/user.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { AdminProfileEditNameCommand } from './admin-profile-edit-name.command';

@CommandHandler(AdminProfileEditNameCommand)
export class AdminProfileEditNameHandler implements ICommandHandler<AdminProfileEditNameCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(command: AdminProfileEditNameCommand): Promise<Result<UUID, HttpException>> {
    const { userId, firstName, lastName, middleName } = command;

    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return Err(new NotFoundException('User not found'));
    }

    user.adminEditPersonalName(firstName, lastName, middleName);

    const result = await this.userRepository.save(user);

    return Ok(result);
  }
}
