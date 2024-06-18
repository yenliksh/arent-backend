import { UserComplaintRepository } from '@domain-repositories/user-complaint/user-complaint.repository';
import { UserComplaintEntity } from '@domains/user-complaint/domain/entities/user-complaint.entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Ok } from 'oxide.ts';

import { CreateUserComplaintCommand } from './create-user-complaint.command';

@CommandHandler(CreateUserComplaintCommand)
export class CreateUserComplaintHandler implements ICommandHandler<CreateUserComplaintCommand> {
  constructor(private readonly userComplaintRepository: UserComplaintRepository) {}

  public async execute(command: CreateUserComplaintCommand): Promise<Ok<UUID>> {
    const { input, senderUserId } = command;

    const domainEntity = UserComplaintEntity.create({ ...input, senderUserId });

    const result = await this.userComplaintRepository.save(domainEntity);

    return Ok(result);
  }
}
