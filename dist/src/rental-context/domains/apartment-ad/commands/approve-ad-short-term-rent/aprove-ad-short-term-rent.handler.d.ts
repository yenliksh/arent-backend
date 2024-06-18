import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';
import { ApproveAdShortTermRentCommand } from './aprove.ad-short-term-rent.command';
export declare class ApproveAdShortTermRentHandler implements ICommandHandler<ApproveAdShortTermRentCommand> {
    private readonly apartmentAdRepository;
    private readonly apartmentAdIdentificatorRepository;
    private readonly shortTermRentDocumentRepository;
    private readonly eventEmitter;
    constructor(apartmentAdRepository: ApartmentAdRepository, apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository, shortTermRentDocumentRepository: ShortTermRentDocumentRepository, eventEmitter: EventEmitter2);
    execute(command: ApproveAdShortTermRentCommand): Promise<Result<UUID, HttpException>>;
}
