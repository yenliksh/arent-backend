import { UserRepository } from '@domain-repositories/user/user.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { AdminProfileEditGuarantorCommand } from './admin-profile-edit-guarantor.command';
export declare class AdminProfileEditGuarantorHandler implements ICommandHandler<AdminProfileEditGuarantorCommand> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(command: AdminProfileEditGuarantorCommand): Promise<Result<UUID, HttpException>>;
}
