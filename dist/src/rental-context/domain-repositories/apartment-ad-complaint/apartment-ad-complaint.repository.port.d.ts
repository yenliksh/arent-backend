import { ApartmentAdComplaintEntity, ComplaintProps } from '@domains/apartment-ad-complaint/domain/entities/apartment-ad-complaint.entity';
import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
export declare type ApartmentAdComplaintRepositoryPort = RepositoryPort<ApartmentAdComplaintEntity, ComplaintProps>;
