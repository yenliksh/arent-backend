import { RentPeriodVersionOrmEntity } from '@infrastructure/database/entities/rent-period-version.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Model } from 'objection';
import { RentPeriodVersionEntity, RentPeriodVersionProps } from '../../domains/rent-period-version/domain/rent-period-version.entity';
import { RentPeriodVersionRepositoryPort } from './rent-period-version.repository.port';
export declare class RentPeriodVersionRepository extends ObjectionRepositoryBase<RentPeriodVersionEntity, RentPeriodVersionProps, RentPeriodVersionOrmEntity> implements RentPeriodVersionRepositoryPort {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    findOne(params?: QueryParams<RentPeriodVersionProps>, trxId?: TransactionId): Promise<RentPeriodVersionEntity | undefined>;
    findMany(params?: QueryParams<RentPeriodVersionProps>): Promise<RentPeriodVersionEntity[]>;
    findOneById(id: string): Promise<RentPeriodVersionEntity | undefined>;
    findLast(trxId?: TransactionId): Promise<RentPeriodVersionEntity | undefined>;
    save(entity: RentPeriodVersionEntity, trxId?: TransactionId): Promise<UUID>;
    delete(entity: RentPeriodVersionEntity): Promise<RentPeriodVersionEntity>;
    protected prepareQuery(params: QueryParams<RentPeriodVersionProps>): DeepPartial<Omit<RentPeriodVersionOrmEntity, keyof Model>>;
}
