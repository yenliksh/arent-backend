import { ApartmentAdOrmEntity } from '@infrastructure/database/entities/apartment-ad.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ApartmentRentPeriodType } from '@infrastructure/enums';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Model } from 'objection';
import { ApartmentAdEntity } from '../../domains/apartment-ad/domain/entities/apartment-ad.entity';
import { ApartmentAdProps } from '../../domains/apartment-ad/domain/entities/apartment-ad.types';
import { ApartmentAdRepositoryPort } from './apartment-ad.repository.port';
export declare class ApartmentAdRepository extends ObjectionRepositoryBase<ApartmentAdEntity, ApartmentAdProps, ApartmentAdOrmEntity> implements ApartmentAdRepositoryPort {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    findOne(params?: QueryParams<ApartmentAdProps>, trxId?: TransactionId): Promise<ApartmentAdEntity | undefined>;
    findMany(params?: QueryParams<ApartmentAdProps>, trxId?: TransactionId): Promise<ApartmentAdEntity[]>;
    findOneById(id: string, trxId?: TransactionId): Promise<ApartmentAdEntity | undefined>;
    findWithAvailable(id: string, rentPeriodType: ApartmentRentPeriodType, arrivalDate?: string, departureDate?: string, trxId?: TransactionId): Promise<ApartmentAdEntity | undefined>;
    save(entity: ApartmentAdEntity, trxId?: TransactionId): Promise<UUID>;
    delete(entity: ApartmentAdEntity, trxId?: TransactionId): Promise<ApartmentAdEntity>;
    protected prepareQuery(params: QueryParams<ApartmentAdProps>): DeepPartial<Omit<ApartmentAdOrmEntity, keyof Model>>;
}
