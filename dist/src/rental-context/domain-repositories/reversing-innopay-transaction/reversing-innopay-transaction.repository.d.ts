import { ReversingInnopayTransactionEntity, ReversingInnopayTransactionProps } from '@domains/innopay-transaction/domain/entities/reversing-innopay-transaction.entity';
import { ReversingInnopayTransactionOrmEntity } from '@infrastructure/database/entities/reversing-innopay-transaction.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Model } from 'objection';
import { ReversingInnopayTransactionRepositoryPort } from './reversing-innopay-transaction.repository.port';
export declare class ReversingInnopayTransactionRepository extends ObjectionRepositoryBase<ReversingInnopayTransactionEntity, ReversingInnopayTransactionProps, ReversingInnopayTransactionOrmEntity> implements ReversingInnopayTransactionRepositoryPort {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    findOne(params?: QueryParams<ReversingInnopayTransactionProps>, trxId?: TransactionId): Promise<ReversingInnopayTransactionEntity | undefined>;
    findMany(params?: QueryParams<ReversingInnopayTransactionProps>): Promise<ReversingInnopayTransactionEntity[]>;
    findOneById(id: string): Promise<ReversingInnopayTransactionEntity | undefined>;
    findByCustomerReference(customerReference: string): Promise<ReversingInnopayTransactionEntity | undefined>;
    save(entity: ReversingInnopayTransactionEntity, trxId?: TransactionId): Promise<UUID>;
    delete(entity: ReversingInnopayTransactionEntity): Promise<ReversingInnopayTransactionEntity>;
    protected prepareQuery(params: QueryParams<ReversingInnopayTransactionProps>): DeepPartial<Omit<ReversingInnopayTransactionOrmEntity, keyof Model>>;
}
