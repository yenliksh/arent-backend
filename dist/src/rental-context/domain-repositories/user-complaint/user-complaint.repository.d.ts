import { UserComplaintEntity, UserComplaintProps } from '@domains/user-complaint/domain/entities/user-complaint.entity';
import { UserComplaintOrmEntity } from '@infrastructure/database/entities/user-complaint.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Model } from 'objection';
import { UserComplaintRepositoryPort } from './user-complaint.repository.port';
export declare class UserComplaintRepository extends ObjectionRepositoryBase<UserComplaintEntity, UserComplaintProps, UserComplaintOrmEntity> implements UserComplaintRepositoryPort {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    findOne(params?: QueryParams<UserComplaintProps>): Promise<UserComplaintEntity | undefined>;
    findMany(params?: QueryParams<UserComplaintProps>): Promise<UserComplaintEntity[]>;
    findOneById(id: string): Promise<UserComplaintEntity | undefined>;
    save(entity: UserComplaintEntity, trxId?: TransactionId): Promise<UUID>;
    delete(entity: UserComplaintEntity): Promise<UserComplaintEntity>;
    protected prepareQuery(params: QueryParams<UserComplaintProps>): DeepPartial<Omit<UserComplaintOrmEntity, keyof Model>>;
}
