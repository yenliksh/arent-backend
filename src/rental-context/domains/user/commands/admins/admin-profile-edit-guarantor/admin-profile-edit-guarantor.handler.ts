import { UserRepository } from '@domain-repositories/user/user.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { AdminProfileEditGuarantorCommand } from './admin-profile-edit-guarantor.command';

@CommandHandler(AdminProfileEditGuarantorCommand)
export class AdminProfileEditGuarantorHandler implements ICommandHandler<AdminProfileEditGuarantorCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(command: AdminProfileEditGuarantorCommand): Promise<Result<UUID, HttpException>> {
    const { userId, firstName, lastName, phone } = command;

    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return Err(new NotFoundException('User not found'));
    }

    user.adminEditGuarantor({ phone, firstName, lastName });

    const result = await this.userRepository.save(user);

    return Ok(result);
  }
}
