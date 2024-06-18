import { UserRepository } from '@domain-repositories/user/user.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { AdminProfileEditGenderCommand } from './admin-profile-edit-gender.command';
export declare class AdminProfileEditGenderHandler implements ICommandHandler<AdminProfileEditGenderCommand> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(command: AdminProfileEditGenderCommand): Promise<Result<UUID, HttpException>>;
}
