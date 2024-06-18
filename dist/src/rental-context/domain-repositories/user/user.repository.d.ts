import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Model } from 'objection';
import { TransactionId, UnitOfWork } from '../../../infrastructure/database/unit-of-work/unit-of-work';
import { UserEntity, UserProps } from '../../domains/user/domain/entities/user.entity';
import { UserRepositoryPort } from './user.repository.port';
export declare class UserRepository extends ObjectionRepositoryBase<UserEntity, UserProps, UserOrmEntity> implements UserRepositoryPort {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    findOne(params?: QueryParams<UserProps>): Promise<UserEntity | undefined>;
    findMany(params?: QueryParams<UserProps>): Promise<UserEntity[]>;
    findOneById(id: string, trxId?: TransactionId): Promise<UserEntity | undefined>;
    findOneByEmail(email: string): Promise<UserEntity | undefined>;
    findByApartmentAdId(apartmentAdId: string, trxId?: string | undefined): Promise<UserEntity | undefined>;
    existsByEmail(email: string): Promise<boolean>;
    existsByPhone(phone: string): Promise<boolean>;
    findOneByPhone(email: string): Promise<UserEntity | undefined>;
    save(entity: UserEntity, trxId?: TransactionId): Promise<UUID>;
    delete(entity: UserEntity, trxId?: TransactionId): Promise<UserEntity>;
    protected prepareQuery(params: QueryParams<UserProps>): DeepPartial<Omit<UserOrmEntity, keyof Model>>;
}
