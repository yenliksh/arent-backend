import { TemporaryPaymentTransactionEntity, TemporaryPaymentTransactionProps } from '@domains/temporary-payment-transaction/domain/entities/temporary-payment-transaction.entity';
import { TemporaryPaymentTransactionOrmEntity } from '@infrastructure/database/entities/temporary-payment-transaction.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Model } from 'objection';
import { TemporaryPaymentTransactionRepositoryPort } from './temporary-payment-transaction.repository.port';
export declare class TemporaryPaymentTransactionRepository extends ObjectionRepositoryBase<TemporaryPaymentTransactionEntity, TemporaryPaymentTransactionProps, TemporaryPaymentTransactionOrmEntity> implements TemporaryPaymentTransactionRepositoryPort {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    findOne(params?: QueryParams<TemporaryPaymentTransactionProps>): Promise<TemporaryPaymentTransactionEntity | undefined>;
    findMany(params?: QueryParams<TemporaryPaymentTransactionProps>): Promise<TemporaryPaymentTransactionEntity[]>;
    findByContractId(contractId: string, trxId?: string | undefined): Promise<TemporaryPaymentTransactionEntity[]>;
    findOneById(id: string, trxId?: TransactionId): Promise<TemporaryPaymentTransactionEntity | undefined>;
    save(entity: TemporaryPaymentTransactionEntity, trxId?: TransactionId): Promise<UUID>;
    delete(entity: TemporaryPaymentTransactionEntity, trxId?: TransactionId): Promise<TemporaryPaymentTransactionEntity>;
    protected prepareQuery(params: QueryParams<TemporaryPaymentTransactionProps>): DeepPartial<Omit<TemporaryPaymentTransactionOrmEntity, keyof Model>>;
}
