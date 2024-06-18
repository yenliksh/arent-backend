import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';
import { RejectAdShortTermRentCommand } from './reject-ad-short-rent.command';
export declare class RejectAdShortTermRentHandler implements ICommandHandler<RejectAdShortTermRentCommand> {
    private readonly apartmentAdRepository;
    private readonly eventEmitter;
    constructor(apartmentAdRepository: ApartmentAdRepository, eventEmitter: EventEmitter2);
    execute(command: RejectAdShortTermRentCommand): Promise<Result<UUID, HttpException>>;
}
