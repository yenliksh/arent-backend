import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
import { ProfileIdentityRejectCommand } from './profile-identity-reject.command';
export declare class ProfileIdentityRejectHandler implements ICommandHandler<ProfileIdentityRejectCommand> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(command: ProfileIdentityRejectCommand): Promise<Result<UUID, HttpException>>;
}
