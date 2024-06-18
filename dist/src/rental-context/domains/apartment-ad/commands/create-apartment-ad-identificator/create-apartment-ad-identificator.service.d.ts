import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Ok } from 'oxide.ts';
import { CreateApartmentAdIdentificatorRequest } from './create-apartment-ad-identificator.request.dto';
export declare class CreateApartmentAdIdentificatorService {
    private readonly apartmentAdIdentificatorRepository;
    constructor(apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository);
    handle(dto: CreateApartmentAdIdentificatorRequest): Promise<Ok<UUID>>;
}
