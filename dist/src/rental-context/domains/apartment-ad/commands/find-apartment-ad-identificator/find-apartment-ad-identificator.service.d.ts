import { ApartmentAdIdentificatorRepository } from '@domain-repositories/apartment-ad-identificator/apartment-ad-identificator.repository';
import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { ApartmentAdIdentificatorOrmEntity } from '@infrastructure/database/entities/apartment-ad-identificator.orm-entity';
import { HttpException } from '@nestjs/common';
import { Result } from 'oxide.ts';
import { FindApartmentAdIdentificatorRequest } from './find-apartment-ad-identificator.request.dto';
import { FindApartmentAdsIdentificatorsRequest } from './find-apartment-ads-identificators.request.dto';
export declare class FindApartmentAdIdentificatorService {
    private readonly apartmentAdIdentificatorRepository;
    constructor(apartmentAdIdentificatorRepository: ApartmentAdIdentificatorRepository);
    handle(dto: FindApartmentAdIdentificatorRequest): Promise<Result<ApartmentAdIdentificatorEntity, HttpException>>;
    handleByApId(dto: FindApartmentAdIdentificatorRequest): Promise<Result<ApartmentAdIdentificatorOrmEntity, HttpException>>;
    handleByApIds(dto: FindApartmentAdsIdentificatorsRequest): Promise<Result<ApartmentAdIdentificatorOrmEntity[], HttpException>>;
}
