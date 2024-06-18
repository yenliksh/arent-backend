import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { Result } from 'oxide.ts';
import { UnitOfWork } from '../../../../../../infrastructure/database/unit-of-work/unit-of-work';
import { LongTermRentDocumentRepository } from '../../../../../../infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '../../../../../../infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { ContractRepository } from '../../../../../domain-repositories/contract/contract.repository';
import { UserRepository } from '../../../../../domain-repositories/user/user.repository';
import { AdminProfileDeleteCommand } from './admin-profile-delete.command';
export declare class AdminProfileDeleteHandler implements ICommandHandler<AdminProfileDeleteCommand> {
    private readonly userRepository;
    private readonly contractRepository;
    private readonly longTermRentDocumentRepository;
    private readonly shortTermRentDocumentRepository;
    private readonly unitOfWork;
    private readonly apartmentAdRepository;
    constructor(userRepository: UserRepository, contractRepository: ContractRepository, longTermRentDocumentRepository: LongTermRentDocumentRepository, shortTermRentDocumentRepository: ShortTermRentDocumentRepository, unitOfWork: UnitOfWork, apartmentAdRepository: ApartmentAdRepository);
    execute(command: AdminProfileDeleteCommand): Promise<Result<UUID, HttpException>>;
    private removeFromElasticsearch;
}
