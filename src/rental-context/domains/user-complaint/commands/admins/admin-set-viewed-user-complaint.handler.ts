import { UserComplaintRepository } from '@domain-repositories/user-complaint/user-complaint.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { AdminSetViewedUserComplaintCommand } from './admin-set-viewed-user-complaint.command';

@CommandHandler(AdminSetViewedUserComplaintCommand)
export class AdminViewedUserComplaintHandler implements ICommandHandler<AdminSetViewedUserComplaintCommand> {
  constructor(private readonly userComplaintRepository: UserComplaintRepository) {}

  public async execute(command: AdminSetViewedUserComplaintCommand): Promise<Result<UUID, HttpException>> {
    const { userComplaintId } = command;

    const userComplaint = await this.userComplaintRepository.findOneById(userComplaintId);

    if (!userComplaint) {
      return Err(new NotFoundException('UserComplaint not found'));
    }

    userComplaint.adminViewed();

    const result = await this.userComplaintRepository.save(userComplaint);

    return Ok(result);
  }
}
