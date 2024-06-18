import { UserComplaintRepository } from '@domain-repositories/user-complaint/user-complaint.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { AdminSetViewedUserComplaintCommand } from './admin-set-viewed-user-complaint.command';
export declare class AdminViewedUserComplaintHandler implements ICommandHandler<AdminSetViewedUserComplaintCommand> {
    private readonly userComplaintRepository;
    constructor(userComplaintRepository: UserComplaintRepository);
    execute(command: AdminSetViewedUserComplaintCommand): Promise<Result<UUID, HttpException>>;
}
