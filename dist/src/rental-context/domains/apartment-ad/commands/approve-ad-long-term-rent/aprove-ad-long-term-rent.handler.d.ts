import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';
import { ApproveAdLongTermRentCommand } from './aprove.ad-long-term-rent.command';
export declare class ApproveAdLongTermRentHandler implements ICommandHandler<ApproveAdLongTermRentCommand> {
    private readonly apartmentAdRepository;
    private readonly longTermRentDocumentRepository;
    private readonly apartmentAdIdentificatorRepository;
    private readonly eventEmitter;
    constructor(apartmentAdRepository: ApartmentAdRepository, longTermRentDocumentRepository: LongTermRentDocumentRepository, apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository, eventEmitter: EventEmitter2);
    execute(command: ApproveAdLongTermRentCommand): Promise<Result<UUID, HttpException>>;
}
