import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Ok } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';
import { CreateApartmentAdRequest } from './create-apartment-ad.request.dto';
export declare class CreateApartmentAdService {
    private readonly apartmentAdRepository;
    constructor(apartmentAdRepository: ApartmentAdRepository);
    handle(dto: CreateApartmentAdRequest, userId: UserOrmEntity['id']): Promise<Ok<UUID>>;
}
