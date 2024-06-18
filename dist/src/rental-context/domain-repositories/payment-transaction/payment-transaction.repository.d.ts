import { PaymentTransactionOrmEntity } from '@infrastructure/database/entities/payment-transaction.orm-entity';
import { TransactionId, UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ObjectionRepositoryBase } from '@libs/ddd/infrastructure/database/objection.repository.base';
import { DeepPartial } from '@libs/types/deep-partial.type';
import { Model } from 'objection';
import { PaymentTransactionEntity, PaymentTransactionProps } from '../../domains/payment-transaction/domain/entities/payment-transaction.entity';
import { PaymentTransactionRepositoryPort } from './payment-transaction.repository.port';
export declare class PaymentTransactionRepository extends ObjectionRepositoryBase<PaymentTransactionEntity, PaymentTransactionProps, PaymentTransactionOrmEntity> implements PaymentTransactionRepositoryPort {
    private readonly unitOfWork;
    constructor(unitOfWork: UnitOfWork);
    findOne(params?: QueryParams<PaymentTransactionProps>, trxId?: TransactionId): Promise<PaymentTransactionEntity | undefined>;
    findMany(params?: QueryParams<PaymentTransactionProps>, trxId?: TransactionId): Promise<PaymentTransactionEntity[]>;
    findOneById(id: string, trxId?: TransactionId): Promise<PaymentTransactionEntity | undefined>;
    findNextCashIn(contractId: string, trxId?: TransactionId): Promise<PaymentTransactionEntity | undefined>;
    findActualCashInWaitingIds(trxId?: TransactionId): Promise<UUID[]>;
    findActualCashOutWaitingIds(trxId?: TransactionId): Promise<UUID[]>;
    findContractFirstPayment(contractId: string, trxId?: TransactionId): Promise<PaymentTransactionEntity | undefined>;
    save(entity: PaymentTransactionEntity, trxId?: TransactionId): Promise<UUID>;
    delete(entity: PaymentTransactionEntity, trxId?: TransactionId): Promise<PaymentTransactionEntity>;
    deleteByContractId(contractId: string, trxId?: TransactionId): Promise<void>;
    protected prepareQuery(params: QueryParams<PaymentTransactionProps>): DeepPartial<Omit<PaymentTransactionOrmEntity, keyof Model>>;
}
