import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';
import { RejectAdLongTermRentCommand } from './reject-ad-long-rent.command';
export declare class RejectAdLongTermRentHandler implements ICommandHandler<RejectAdLongTermRentCommand> {
    private readonly apartmentAdRepository;
    private readonly eventEmitter;
    constructor(apartmentAdRepository: ApartmentAdRepository, eventEmitter: EventEmitter2);
    execute(command: RejectAdLongTermRentCommand): Promise<Result<UUID, HttpException>>;
}
