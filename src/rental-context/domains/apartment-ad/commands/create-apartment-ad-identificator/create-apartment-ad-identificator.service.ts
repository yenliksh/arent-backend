import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Injectable } from '@nestjs/common';
import { Ok } from 'oxide.ts';

import { CreateApartmentAdIdentificatorRequest } from './create-apartment-ad-identificator.request.dto';

@Injectable()
export class CreateApartmentAdIdentificatorService {
  constructor(private readonly apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository) {}

  async handle(dto: CreateApartmentAdIdentificatorRequest): Promise<Ok<UUID>> {
    const { apartmentId, titleSeo } = dto;

    const isExist = await this.apartmentAdIdentificatorRepository.findOneByApartmentId(apartmentId);

    if (isExist) {
      await this.apartmentAdIdentificatorRepository.updateByApartmentId(isExist.getPropsCopy().id.value, titleSeo);
    } else {
      const domainEntity = ApartmentAdIdentificatorEntity.create({
        apartmentId: new UUID(apartmentId),
        titleSeo,
      });

      await this.apartmentAdIdentificatorRepository.save(domainEntity);
    }

    return Ok(new UUID(apartmentId));
  }
}
