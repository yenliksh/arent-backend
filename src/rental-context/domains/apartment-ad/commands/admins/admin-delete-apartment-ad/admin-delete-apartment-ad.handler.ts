import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { ApartmentAdEntity } from '@domains/apartment-ad/domain/entities/apartment-ad.entity';
import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { ContractStatus } from '@infrastructure/enums';
import { BadRequestException, HttpException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Err, Ok, Result } from 'oxide.ts';

import { ContractRepository } from '../../../../../domain-repositories/contract/contract.repository';
import { AdminDeleteApartmentAdCommand } from './admin-delete-apartment-ad.command';

@CommandHandler(AdminDeleteApartmentAdCommand)
export class AdminDeleteApartmentAdHandler implements ICommandHandler<AdminDeleteApartmentAdCommand> {
  constructor(
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly contractRepository: ContractRepository,
    private readonly shortTermRentDocumentRepository: ShortTermRentDocumentRepository,
    private readonly longTermRentDocumentRepository: LongTermRentDocumentRepository,
  ) {}

  public async execute(command: AdminDeleteApartmentAdCommand): Promise<Result<ApartmentAdEntity, HttpException>> {
    const { apartmentAdId } = command;

    const apartmentAd = await this.apartmentAdRepository.findOneById(apartmentAdId);

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    const contracts = await this.contractRepository.findManyActiveContracts(apartmentAd.id.value);

    if (
      contracts.some(
        (contract) =>
          contract.status.value === ContractStatus.CONCLUDED ||
          contract.status.value === ContractStatus.OFFERING ||
          contract.isPending,
      )
    ) {
      return Err(new BadRequestException('Apartment in active rent'));
    }

    await Promise.all(
      contracts.map((contract) => {
        contract.reject(), this.contractRepository.save(contract);
      }),
    );

    const result = await this.apartmentAdRepository.delete(apartmentAd);

    await this.removeFromElasticsearch(apartmentAd);

    return Ok(result);
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
