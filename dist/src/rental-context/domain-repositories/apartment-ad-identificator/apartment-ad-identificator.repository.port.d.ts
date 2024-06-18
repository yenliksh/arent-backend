import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { ApartmentAdIdentificatorProps } from '@domains/apartment-ad/domain/entities/apartment-ad.types';
import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
export declare type ApartmentAdIdentificatorRepositoryPort = RepositoryPort<ApartmentAdIdentificatorEntity, ApartmentAdIdentificatorProps>;
