import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Injectable } from '@nestjs/common';
import { Ok } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';
import { ApartmentAdEntity } from 'src/rental-context/domains/apartment-ad/domain/entities/apartment-ad.entity';

import { CreateApartmentAdRequest } from './create-apartment-ad.request.dto';

@Injectable()
export class CreateApartmentAdService {
  constructor(private readonly apartmentAdRepository: ApartmentAdRepository) {}

  async handle(dto: CreateApartmentAdRequest, userId: UserOrmEntity['id']): Promise<Ok<UUID>> {
    const { rentPeriodType, longTermRentCost, shortTermRentCost } = dto;

    const domainEntity = ApartmentAdEntity.create({
      landlordId: new UUID(userId),
      rentPeriodType: rentPeriodType,
      longTermRentCost,
      shortTermRentCost,
    });

    const result = await this.apartmentAdRepository.save(domainEntity);

    return Ok(result);
  }
}
