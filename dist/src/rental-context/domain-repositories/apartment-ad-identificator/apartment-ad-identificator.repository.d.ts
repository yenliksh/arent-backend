import { ApartmentAdIdentificatorEntity } from '@domains/apartment-ad/domain/entities/apartment-ad-identificator.entity';
import { ApartmentAdIdentificatorProps } from '@domains/apartment-ad/domain/entities/apartment-ad.types';
import { ApartmentAdIdentificatorOrmEntity } from '@infrastructure/database/entities/apartment-ad-identificator.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Model } from 'objection';
import { ApartmentAdIdentificatorRepositoryPort } from './apartment-ad-identificator.repository.port';
export declare class ApartmentAdIdentificatorRepository extends ObjectionRepositoryBase<ApartmentAdIdentificatorEntity, ApartmentAdIdentificatorProps, ApartmentAdIdentificatorOrmEntity> implements ApartmentAdIdentificatorRepositoryPort {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    save(entity: ApartmentAdIdentificatorEntity, trxId?: TransactionId): Promise<UUID>;
    findOne(params?: QueryParams<ApartmentAdIdentificatorProps>, trxId?: TransactionId): Promise<ApartmentAdIdentificatorEntity | undefined>;
    findMany(params?: QueryParams<ApartmentAdIdentificatorProps>, trxId?: TransactionId): Promise<ApartmentAdIdentificatorEntity[]>;
    findOneById(id: string): Promise<ApartmentAdIdentificatorEntity | undefined>;
    findOneBySearchId(id: string): Promise<ApartmentAdIdentificatorEntity | undefined>;
    findOneByApartmentId(id: string): Promise<ApartmentAdIdentificatorEntity | undefined>;
    findByApartmentId(id: string): Promise<ApartmentAdIdentificatorEntity[] | undefined>;
    findManyByApartmentIds(ids: string[]): Promise<ApartmentAdIdentificatorOrmEntity[] | undefined>;
    updateByApartmentId(id: string, titleSeo?: string, slug?: string): Promise<boolean | undefined>;
    delete(entity: ApartmentAdIdentificatorEntity, trxId?: TransactionId): Promise<ApartmentAdIdentificatorEntity>;
    deleteByApartmentId(id: string): Promise<boolean | undefined>;
    deleteAll(): Promise<boolean | undefined>;
    protected prepareQuery(params: QueryParams<ApartmentAdIdentificatorProps>): DeepPartial<Omit<ApartmentAdIdentificatorOrmEntity, keyof Model>>;
}
