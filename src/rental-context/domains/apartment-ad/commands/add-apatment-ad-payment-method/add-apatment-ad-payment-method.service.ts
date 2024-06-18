import { InnopayCardRepository } from '@domain-repositories/innopay-card/innopay-card.repository';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { PaymentMethod } from '@infrastructure/enums';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Err, Ok, Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';

import { AddApartmentAdPaymentMethodRequest } from './add-apatment-ad-payment-method.request.dto';

@Injectable()
export class AddApartmentAdPaymentMethodService {
  constructor(
    private readonly apartmentAdRepository: ApartmentAdRepository,
    private readonly innopayCardRepository: InnopayCardRepository,
  ) {}

  async handle(
    dto: AddApartmentAdPaymentMethodRequest,
    userId: UserOrmEntity['id'],
  ): Promise<Result<UUID, HttpException>> {
    const { id, cardId } = dto;

    const isCardExist = await this.innopayCardRepository.isCardExist({ cardId, userId });

    if (!isCardExist) {
      throw new NotFoundException('Card cannot be found');
    }

    const apartmentAd = await this.apartmentAdRepository.findOne({
      id: new UUID(id),
      landlordId: new UUID(userId),
    });

    if (!apartmentAd) {
      return Err(new NotFoundException('Apartment ad not found'));
    }

    apartmentAd.setPaymentMethod({ defaultType: PaymentMethod.INNOPAY, innopayCardId: cardId });

    const result = await this.apartmentAdRepository.save(apartmentAd);

    return Ok(result);
  }
}
