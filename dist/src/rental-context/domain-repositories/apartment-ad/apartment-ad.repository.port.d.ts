import { ApartmentAdEntity } from '@domains/apartment-ad/domain/entities/apartment-ad.entity';
import { ApartmentAdProps } from '@domains/apartment-ad/domain/entities/apartment-ad.types';
import { TransactionId } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
export interface ApartmentAdRepositoryPort extends RepositoryPort<ApartmentAdEntity, ApartmentAdProps> {
    findWithAvailable(id: string, rentPeriodType: ApartmentRentPeriodType, arrivalDate?: string, departureDate?: string, trxId?: TransactionId): Promise<ApartmentAdEntity | undefined>;
}
