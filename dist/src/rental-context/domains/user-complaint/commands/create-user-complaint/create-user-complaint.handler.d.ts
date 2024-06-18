import { UserComplaintRepository } from '@domain-repositories/user-complaint/user-complaint.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ICommandHandler } from '@nestjs/cqrs';
import { Ok } from 'oxide.ts';
import { CreateUserComplaintCommand } from './create-user-complaint.command';
export declare class CreateUserComplaintHandler implements ICommandHandler<CreateUserComplaintCommand> {
    private readonly userComplaintRepository;
    constructor(userComplaintRepository: UserComplaintRepository);
    execute(command: CreateUserComplaintCommand): Promise<Ok<UUID>>;
}
