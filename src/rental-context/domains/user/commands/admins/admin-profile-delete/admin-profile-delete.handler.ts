import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { ApartmentAdEntity } from '@domains/apartment-ad/domain/entities/apartment-ad.entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { UnitOfWork } from '../../../../../../infrastructure/database/unit-of-work/unit-of-work';
import { LongTermRentDocumentRepository } from '../../../../../../infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '../../../../../../infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { ContractRepository } from '../../../../../domain-repositories/contract/contract.repository';
import { UserRepository } from '../../../../../domain-repositories/user/user.repository';
import { AdminProfileDeleteCommand } from './admin-profile-delete.command';

@CommandHandler(AdminProfileDeleteCommand)
export class AdminProfileDeleteHandler implements ICommandHandler<AdminProfileDeleteCommand> {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly contractRepository: ContractRepository,
    private readonly longTermRentDocumentRepository: LongTermRentDocumentRepository,
    private readonly shortTermRentDocumentRepository: ShortTermRentDocumentRepository,
    private readonly unitOfWork: UnitOfWork,
    private readonly apartmentAdRepository: ApartmentAdRepository,
  ) {}

  public async execute(command: AdminProfileDeleteCommand): Promise<Result<UUID, HttpException>> {
    const { userId } = command;

    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      return Err(new NotFoundException('User not found'));
    }

    const trxId = await this.unitOfWork.start();

    try {
      const [apartmentAds, contracts] = await Promise.all([
        this.apartmentAdRepository.findMany({ landlordId: user.id }, trxId),
        this.contractRepository.findManyActiveContractsByUserId(user.id.value, trxId),
      ]);

      contracts.forEach((contract) => {
        contract.reject();
      });

      await this.contractRepository.saveMany(contracts, trxId);

      await this.userRepository.delete(user, trxId);

      await this.unitOfWork.commit(trxId);

      for (const apartmentAd of apartmentAds) {
        this.removeFromElasticsearch(apartmentAd);
      }

      return Ok(user.id);
    } catch (error) {
      await this.unitOfWork.rollback(trxId);
      throw error;
    }
  }

  private async removeFromElasticsearch(apartmentAd: ApartmentAdEntity) {
    if (apartmentAd.isLongTermRent && apartmentAd.longTermRentStatus?.isPublished) {
      await this.longTermRentDocumentRepository.delete(apartmentAd);
    }

    if (apartmentAd.isShortTermRent && apartmentAd.shortTermRentStatus?.isPublished) {
      await this.shortTermRentDocumentRepository.delete(apartmentAd);
    }
  }
}
