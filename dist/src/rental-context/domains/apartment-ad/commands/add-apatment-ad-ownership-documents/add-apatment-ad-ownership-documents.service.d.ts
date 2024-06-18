import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { ApartmentAdRepository } from 'src/rental-context/domain-repositories/apartment-ad/apartment-ad.repository';
import { AddApartmentAdOwnershipDocumentRequest } from './add-apatment-ad-ownership-documents.request.dto';
export declare class AddApartmentAdOwnershipDocumentsService {
    private readonly apartmentAdRepository;
    constructor(apartmentAdRepository: ApartmentAdRepository);
    handle(dto: AddApartmentAdOwnershipDocumentRequest, userId: UserOrmEntity['id']): Promise<Result<UUID, HttpException>>;
}
