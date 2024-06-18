import { NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Result } from 'oxide.ts';
import { UserRepository } from 'src/rental-context/domain-repositories/user/user.repository';
export declare class SendContractOfferEmailService {
    private readonly userRepository;
    private eventEmitter;
    constructor(userRepository: UserRepository, eventEmitter: EventEmitter2);
    handle(userId: string): Promise<Result<string, NotFoundException>>;
}
