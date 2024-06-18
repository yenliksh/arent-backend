import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
import { ProfileIdentityApproveCommand } from './profile-identity-approve.command';
export declare class ProfileIdentityApproveHandler implements ICommandHandler<ProfileIdentityApproveCommand> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(command: ProfileIdentityApproveCommand): Promise<Result<UUID, HttpException>>;
}
