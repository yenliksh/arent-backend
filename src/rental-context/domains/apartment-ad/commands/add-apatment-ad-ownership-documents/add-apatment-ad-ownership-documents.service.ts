import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';

import { AddApartmentAdOwnershipDocumentRequest } from './add-apatment-ad-ownership-documents.request.dto';

@Injectable()
export class AddApartmentAdOwnershipDocumentsService {
  constructor(private readonly apartmentAdRepository: ApartmentAdRepository) {}

  async handle(
    dto: AddApartmentAdOwnershipDocumentRequest,
    userId: UserOrmEntity['id'],
  ): Promise<Result<UUID, HttpException>> {
    const { id, ownershipDocuments } = dto;

    const apartmentAd = await this.apartmentAdRepository.findOne({
      id: new UUID(id),
      landlordId: new UUID(userId),
    });

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    if (!apartmentAd.isLongTermRent) {
      return Err(new UnprocessableEntityException('Changes cannot be applied'));
    }

    apartmentAd.setOwnershipDocuments(ownershipDocuments);

    const result = await this.apartmentAdRepository.save(apartmentAd);

    return Ok(result);
  }
}
