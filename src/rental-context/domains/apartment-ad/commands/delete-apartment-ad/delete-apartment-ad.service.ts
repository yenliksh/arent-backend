import { ApartmentAdRepository } from '@domain-repositories/apartment-ad/apartment-ad.repository';
import { ApartmentAdEntity } from '@domains/apartment-ad/domain/entities/apartment-ad.entity';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { LongTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/long-term-rent.document-repository';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';

import { ContractStatus } from '../../../../../infrastructure/enums';
import { ContractRepository } from '../../../../domain-repositories/contract/contract.repository';
import { DeleteApartmentAdRequest } from './delete-apartment-ad.request.dto';

@Injectable()
export class DeleteApartmentAdService {
  constructor(
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly contractRepository: ContractRepository,
    private readonly shortTermRentDocumentRepository: ShortTermRentDocumentRepository,
    private readonly longTermRentDocumentRepository: LongTermRentDocumentRepository,
  ) {}

  async handle(
    dto: DeleteApartmentAdRequest,
    userId: UserOrmEntity['id'],
  ): Promise<Result<ApartmentAdEntity, HttpException>> {
    const { id } = dto;

    const apartmentAd = await this.apartmentAdRepository.findOne({
      id: new UUID(id),
      landlordId: new UUID(userId),
    });

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
