import { ApartmentAdComplaintEntity, ComplaintProps } from '@domains/apartment-ad-complaint/domain/entities/apartment-ad-complaint.entity';
import { ApartmentAdComplaintOrmEntity } from '@infrastructure/database/entities/apartment-ad-complaint.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Model } from 'objection';
import { ApartmentAdComplaintRepositoryPort } from './apartment-ad-complaint.repository.port';
export declare class ApartmentAdComplaintRepository extends ObjectionRepositoryBase<ApartmentAdComplaintEntity, ComplaintProps, ApartmentAdComplaintOrmEntity> implements ApartmentAdComplaintRepositoryPort {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    findOne(params?: QueryParams<ComplaintProps>): Promise<ApartmentAdComplaintEntity | undefined>;
    findMany(params?: QueryParams<ComplaintProps>): Promise<ApartmentAdComplaintEntity[]>;
    findOneById(id: string): Promise<ApartmentAdComplaintEntity | undefined>;
    save(entity: ApartmentAdComplaintEntity, trxId?: TransactionId): Promise<UUID>;
    delete(entity: ApartmentAdComplaintEntity): Promise<ApartmentAdComplaintEntity>;
    protected prepareQuery(params: QueryParams<ComplaintProps>): DeepPartial<Omit<ApartmentAdComplaintOrmEntity, keyof Model>>;
}
