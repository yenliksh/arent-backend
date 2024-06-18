import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { ShortTermRentDocumentRepository } from '@infrastructure/elastic-search/repositories/short-term-rent.document-repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';
import { ShortTermSwitchRentBookingTypeRequest } from './short-term-switch-rent-booking-type.request.dto';
export declare class ShortTermSwitchRentBookingTypeService {
    private readonly apartmentAdRepository;
    private readonly shortTermRentDocumentRepository;
    constructor(apartmentAdRepository: ApartmentAdRepository, shortTermRentDocumentRepository: ShortTermRentDocumentRepository);
    handle(dto: ShortTermSwitchRentBookingTypeRequest, userId: UserOrmEntity['id']): Promise<Result<UUID, HttpException>>;
}
