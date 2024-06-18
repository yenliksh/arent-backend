import { UserRepository } from '@domain-repositories/user/user.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { AdminProfileEditBirthdateCommand } from './admin-profile-edit-birthdate.command';
export declare class AdminProfileEditBirthdateHandler implements ICommandHandler<AdminProfileEditBirthdateCommand> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(command: AdminProfileEditBirthdateCommand): Promise<Result<UUID, HttpException>>;
}
