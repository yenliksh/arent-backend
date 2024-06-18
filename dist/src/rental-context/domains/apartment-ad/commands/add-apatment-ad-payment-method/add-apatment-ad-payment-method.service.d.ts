import { InnopayCardRepository } from '@domain-repositories/innopay-card/innopay-card.repository';
import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';
import { AddApartmentAdPaymentMethodRequest } from './add-apatment-ad-payment-method.request.dto';
export declare class AddApartmentAdPaymentMethodService {
    private readonly apartmentAdRepository;
    private readonly innopayCardRepository;
    constructor(apartmentAdRepository: ApartmentAdRepository, innopayCardRepository: InnopayCardRepository);
    handle(dto: AddApartmentAdPaymentMethodRequest, userId: UserOrmEntity['id']): Promise<Result<UUID, HttpException>>;
}
