import { UserRepository } from '@domain-repositories/user/user.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { AdminProfileEditNameCommand } from './admin-profile-edit-name.command';
export declare class AdminProfileEditNameHandler implements ICommandHandler<AdminProfileEditNameCommand> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(command: AdminProfileEditNameCommand): Promise<Result<UUID, HttpException>>;
}
