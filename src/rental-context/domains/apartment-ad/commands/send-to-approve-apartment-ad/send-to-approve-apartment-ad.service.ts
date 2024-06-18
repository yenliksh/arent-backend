import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';

import { SendToApproveApartmentAdRequest } from './send-to-approve-apartment-ad.request.dto';

@Injectable()
export class SendToApproveApartmentAdService {
  constructor(private readonly apartmentAdRepository: ApartmentAdRepository) {}

  async handle(
    dto: SendToApproveApartmentAdRequest,
    userId: UserOrmEntity['id'],
  ): Promise<Result<UUID, HttpException>> {
    const { id } = dto;

    const apartmentAd = await this.apartmentAdRepository.findOne({ id: new UUID(id), landlordId: new UUID(userId) });

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    apartmentAd.sendToApprove();

    const result = await this.apartmentAdRepository.save(apartmentAd);

    return Ok(result);
  }
}
